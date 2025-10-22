'use client';

import React, { useState, useEffect } from 'react';
import { getClientAssets, uploadAsset } from '@/lib/clientApi';
import type { Asset } from '@/lib/clientApi';
import { useRouter } from 'next/navigation';

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [projects, setProjects] = useState<{id: string, title: string}[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadAssets() {
      try {
        const data = await getClientAssets();
        setAssets(data);
        
        // Extract unique projects from assets for the dropdown
        const uniqueProjects = Array.from(
          new Set(data.map(asset => asset.project_id))
        ).map(projectId => {
          const asset = data.find(a => a.project_id === projectId);
          return {
            id: projectId || '',
            title: asset?.project_title || `Project #${projectId?.substring(0, 8)}`
          };
        });
        
        setProjects(uniqueProjects);
      } catch (error) {
        console.error('Error loading assets:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadAssets();
  }, []);

  function formatDate(dateString: string | null) {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0 || !selectedProject) return;
    
    setUploading(true);
    
    try {
      const file = files[0];
      await uploadAsset(selectedProject, file);
      
      // Refresh assets list
      const updatedAssets = await getClientAssets();
      setAssets(updatedAssets);
      
      // Reset file input
      event.target.value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  function getFileIcon(fileUrl: string) {
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return (
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'doc':
      case 'docx':
        return (
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'xls':
      case 'xlsx':
        return (
          <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
          </svg>
        );
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Assets</h1>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            
            <label
              htmlFor="file-upload"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                !selectedProject || uploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Asset'}
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileUpload}
                disabled={!selectedProject || uploading}
              />
            </label>
          </div>
        </div>
      </div>

      {assets.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  {getFileIcon(asset.file_url || '')}
                  <div className="ml-4 flex-1 truncate">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {asset.file_url?.split('/').pop() || 'Unnamed file'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {asset.project_title || `Project #${asset.project_id?.substring(0, 8)}`}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">
                    Uploaded: {formatDate(asset.uploaded_at)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    By: {asset.uploaded_by || 'Unknown'}
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={asset.file_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View File
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white shadow rounded-lg mt-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No assets</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading a new asset.</p>
          <div className="mt-6">
            <label
              htmlFor="empty-file-upload"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                !selectedProject
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              }`}
            >
              Upload Asset
              <input
                id="empty-file-upload"
                name="empty-file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileUpload}
                disabled={!selectedProject}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}