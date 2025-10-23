import { supabaseClient } from './supabaseClient';

// Default bucket names
const ASSETS_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_ASSETS_BUCKET || 'assets';
const PUBLIC_BUCKET = 'public';

/**
 * Upload a file to Supabase Storage
 * @param file The file to upload
 * @param bucket The storage bucket name (defaults to assets)
 * @param path Optional path within the bucket
 * @returns The file URL if successful
 */
export async function uploadFile(
  file: File, 
  bucket: string = ASSETS_BUCKET,
  path: string = ''
): Promise<string> {
  // Create a unique filename to avoid collisions
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : fileName;

  const { data, error } = await supabaseClient
    .storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }

  return data.path;
}

/**
 * Get a public URL for a file (for public bucket)
 */
export function getPublicFileUrl(path: string, bucket: string = PUBLIC_BUCKET): string {
  const { data } = supabaseClient
    .storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
}

/**
 * Get a signed URL for a private file (for assets bucket)
 * @param path The file path within the bucket
 * @param bucket The storage bucket name (defaults to assets)
 * @param expiresIn Expiration time in seconds (default: 60 minutes)
 * @returns The signed URL if successful
 */
export async function getSignedUrl(
  path: string,
  bucket: string = ASSETS_BUCKET,
  expiresIn: number = 3600
): Promise<string> {
  const { data, error } = await supabaseClient
    .storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error('Error creating signed URL:', error);
    throw new Error('Failed to create signed URL');
  }

  return data.signedUrl;
}

/**
 * List all files in a bucket or folder
 * @param bucket The storage bucket name (defaults to assets)
 * @param path Optional path within the bucket
 * @returns Array of file objects
 */
export async function listFiles(
  bucket: string = ASSETS_BUCKET,
  path: string = ''
) {
  const { data, error } = await supabaseClient
    .storage
    .from(bucket)
    .list(path);

  if (error) {
    console.error('Error listing files:', error);
    throw new Error('Failed to list files');
  }

  return data;
}

/**
 * Delete a file from storage
 * @param path The file path to delete
 * @param bucket The storage bucket name (defaults to assets)
 * @returns True if successful
 */
export async function deleteFile(
  path: string,
  bucket: string = ASSETS_BUCKET
): Promise<boolean> {
  const { error } = await supabaseClient
    .storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }

  return true;
}

/**
 * Upload a project asset and associate it with a project in the database
 * @param file The file to upload
 * @param projectId The project ID to associate with
 * @param description Optional description of the asset
 * @returns The created asset record
 */
export async function uploadProjectAsset(
  file: File,
  projectId: string,
  description: string = ''
) {
  // 1. Upload the file to storage
  const filePath = await uploadFile(file, ASSETS_BUCKET, `projects/${projectId}`);
  
  // 2. Create an asset record in the database
  const { data, error } = await supabaseClient
    .from('assets')
    .insert({
      project_id: projectId,
      file_path: filePath,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
      description: description
    })
    .select()
    .single();

  if (error) {
    // If database insert fails, try to clean up the uploaded file
    try {
      await deleteFile(filePath);
    } catch (cleanupError) {
      console.error('Failed to clean up file after database error:', cleanupError);
    }
    
    console.error('Error creating asset record:', error);
    throw new Error('Failed to create asset record');
  }

  return data;
}

