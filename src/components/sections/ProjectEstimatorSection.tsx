'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';

type ServiceCategory = 'Digital Products' | 'Data & Analytics' | 'Creative' | 'Training';
type BuildType = 'Custom build';

export default function ProjectEstimatorSection() {
  const [service, setService] = useState<ServiceCategory>('Digital Products');
  const [buildType, setBuildType] = useState<BuildType>('Custom build');

  const [webConfig, setWebConfig] = useState({
    staticPages: 1,
    contentPages: 0,
    features: new Set<string>(),
  });

  const [appConfig, setAppConfig] = useState({
    simpleScreens: 0,
    interactiveScreens: 0,
    features: new Set<string>(),
    apiRange: 4000,
  });

  const [dataConfig, setDataConfig] = useState({
    module: 'Analytics' as 'Analytics' | 'Data Science' | 'Engineering' | 'Cybersecurity' | 'Virtual Assistance',
    dataSources: 0,
    dashboardType: 'None' as 'None' | 'Simple' | 'Advanced',
    addons: new Set<string>(),
    modelType: 'None' as 'None' | 'Descriptive' | 'Predictive' | 'Advanced ML',
    dataSize: 'Small' as 'Small' | 'Medium' | 'Large',
    pipelines: new Set<string>(),
    storage: new Set<string>(),
    monitoringMonthly: false,
    assistanceHours: 0,
    assistanceAutomation: false,
  });

  const [creativeConfig, setCreativeConfig] = useState({
    items: new Map<string, number>([
      ['Logo design', 0],
      ['Brand kit', 0],
      ['Social media post (design)', 0],
      ['Poster / flyer', 0],
      ['UI screen design', 0],
      ['Blog article (content)', 0],
      ['Social media post (content)', 0],
      ['Video script', 0],
      ['Monthly content pack (12 posts)', 0],
    ]),
  });

  const [trainingConfig, setTrainingConfig] = useState({
    individuals: 0,
    workshops: 0,
  });

  const [monthlyAddons, setMonthlyAddons] = useState(new Set<string>());

  const prices = {
    web: {
      baseSetup: 3500,
      staticPage: 800,
      contentPage: 1200,
      features: {
        'Contact form': 600,
        'Blog system': 1500,
        'CMS / Admin': 2000,
        'User auth': 3000,
        'Payment integration': 2500,
        'Booking system': 2000,
        'Multilingual': 1800,
        'API integration (range)': [3000, 6000] as [number, number],
      },
    },
    app: {
      base: 10000,
      simpleScreen: 1200,
      interactiveScreen: 2500,
      features: {
        'User authentication': 3000,
        'Payments': 4000,
        'Notifications': 2000,
        'Admin dashboard': 6000,
        '3rd-party API (range)': [4000, 8000] as [number, number],
      },
    },
    data: {
      analytics: {
        base: 4000,
        source: 1500,
        dashboards: {
          Simple: 3000,
          Advanced: 6000,
        },
        addons: {
          'Automated refresh': 1500,
          Forecasting: 3500,
          'Custom APIs': 2000,
          'Monthly reporting logic': 2500,
        },
      },
      science: {
        base: 6000,
        models: {
          Descriptive: 4000,
          Predictive: 8000,
          'Advanced ML': 15000,
        },
        dataSizeMultiplier: {
          Small: 0,
          Medium: 0.2,
          Large: 0.4,
        },
      },
      engineering: {
        base: 8000,
        pipelines: {
          'Simple ETL': 4000,
          'Automated pipeline': 7000,
        },
        storage: {
          'Database setup': 3000,
          'Cloud data warehouse': 6000,
        },
      },
      cybersecurity: {
        audit: 8000,
        policyAccess: 5000,
        staffTraining: 3000,
        monthlyMonitoring: 6000,
      },
      assistance: {
        '20 hours/month': 4000,
        '40 hours/month': 7500,
        automationAddon: 3000,
      },
    },
    creative: {
      'Logo design': 3000,
      'Brand kit': 6000,
      'Social media post (design)': 350,
      'Poster / flyer': 800,
      'UI screen design': 1200,
      'Blog article (content)': 700,
      'Social media post (content)': 300,
      'Video script': 1000,
      'Monthly content pack (12 posts)': 4500,
    },
    training: {
      individualPerPerson: 3000,
      corporateWorkshop: 20000,
    },
    monthly: {
      Hosting: 300,
      Maintenance: 800,
      Analytics: 500,
      Security: 700,
    },
  };

  const breakdown = useMemo(() => {
    const lines: { label: string; amount: number; type: 'one-time' | 'monthly' }[] = [];

    if (service === 'Digital Products') {
      lines.push({ label: 'Base website setup', amount: prices.web.baseSetup, type: 'one-time' });
      if (buildType === 'Custom build') {
        if (webConfig.staticPages > 0) lines.push({ label: `Static pages x${webConfig.staticPages}`, amount: webConfig.staticPages * prices.web.staticPage, type: 'one-time' });
        if (webConfig.contentPages > 0) lines.push({ label: `Content-heavy pages x${webConfig.contentPages}`, amount: webConfig.contentPages * prices.web.contentPage, type: 'one-time' });
        webConfig.features.forEach((f) => {
          if (f === 'API integration') {
            // Use average of range for estimation
            lines.push({ label: 'API integration', amount: 4500, type: 'one-time' });
          } else {
            const featurePrice = prices.web.features[f as keyof typeof prices.web.features];
            if (typeof featurePrice === 'number') lines.push({ label: f, amount: featurePrice, type: 'one-time' });
          }
        });
      }
    }

    if (service === 'Digital Products' && buildType === 'Custom build') {
      // Allow API integration range selection
      if (webConfig.features.has('API integration')) {
         // Already added above in webConfig.features loop, removing duplicate logic that uses missing property
      }
    }

    if (service === 'Digital Products' && buildType === 'Custom build') {
      // No-op additional lines covered above
    }

    if (service === 'Digital Products' && buildType === 'Custom build') {
      // Application development if treated as App under Digital Products
    }

    if (service === 'Digital Products' && buildType === 'Custom build') {
      // Add app features if selected
    }

    if (service === 'Digital Products' && buildType === 'Custom build') {
      // Done
    }

    if (service === 'Digital Products' && buildType === 'Custom build' && (appConfig.simpleScreens > 0 || appConfig.interactiveScreens > 0 || appConfig.features.size > 0)) {
      lines.push({ label: 'Base app architecture', amount: prices.app.base, type: 'one-time' });
      if (appConfig.simpleScreens > 0) lines.push({ label: `Simple screens x${appConfig.simpleScreens}`, amount: appConfig.simpleScreens * prices.app.simpleScreen, type: 'one-time' });
      if (appConfig.interactiveScreens > 0) lines.push({ label: `Interactive screens x${appConfig.interactiveScreens}`, amount: appConfig.interactiveScreens * prices.app.interactiveScreen, type: 'one-time' });
      appConfig.features.forEach((f) => {
        if (f === '3rd-party API') {
          lines.push({ label: '3rd-party API (range avg)', amount: appConfig.apiRange, type: 'one-time' });
        } else {
          const featurePrice = prices.app.features[f as keyof typeof prices.app.features];
          if (typeof featurePrice === 'number') lines.push({ label: f, amount: featurePrice, type: 'one-time' });
        }
      });
    }

    if (service === 'Data & Analytics') {
      if (dataConfig.module === 'Analytics') {
        lines.push({ label: 'Base analytics setup', amount: prices.data.analytics.base, type: 'one-time' });
        if (dataConfig.dataSources > 0) lines.push({ label: `Data sources x${dataConfig.dataSources}`, amount: dataConfig.dataSources * prices.data.analytics.source, type: 'one-time' });
        if (dataConfig.dashboardType === 'Simple') lines.push({ label: 'Simple dashboard', amount: prices.data.analytics.dashboards.Simple, type: 'one-time' });
        if (dataConfig.dashboardType === 'Advanced') lines.push({ label: 'Advanced dashboard', amount: prices.data.analytics.dashboards.Advanced, type: 'one-time' });
        dataConfig.addons.forEach((a) => {
          const p = prices.data.analytics.addons[a as keyof typeof prices.data.analytics.addons];
          lines.push({ label: a, amount: p, type: 'one-time' });
        });
      }
      if (dataConfig.module === 'Data Science') {
        lines.push({ label: 'Base project setup', amount: prices.data.science.base, type: 'one-time' });
        if (dataConfig.modelType !== 'None') {
          const baseModel = prices.data.science.models[dataConfig.modelType as keyof typeof prices.data.science.models];
          const multiplier = prices.data.science.dataSizeMultiplier[dataConfig.dataSize];
          const amount = Math.round(baseModel * (1 + multiplier));
          lines.push({ label: `${dataConfig.modelType} model (${dataConfig.dataSize} data)`, amount, type: 'one-time' });
        }
      }
      if (dataConfig.module === 'Engineering') {
        lines.push({ label: 'Base pipeline setup', amount: prices.data.engineering.base, type: 'one-time' });
        dataConfig.pipelines.forEach((p) => lines.push({ label: p, amount: prices.data.engineering.pipelines[p as keyof typeof prices.data.engineering.pipelines], type: 'one-time' }));
        dataConfig.storage.forEach((s) => lines.push({ label: s, amount: prices.data.engineering.storage[s as keyof typeof prices.data.engineering.storage], type: 'one-time' }));
      }
      if (dataConfig.module === 'Cybersecurity') {
        lines.push({ label: 'Security audit', amount: prices.data.cybersecurity.audit, type: 'one-time' });
        if (dataConfig.monitoringMonthly) lines.push({ label: 'Monthly monitoring', amount: prices.data.cybersecurity.monthlyMonitoring, type: 'monthly' });
        lines.push({ label: 'Policy & access setup', amount: prices.data.cybersecurity.policyAccess, type: 'one-time' });
        lines.push({ label: 'Staff training', amount: prices.data.cybersecurity.staffTraining, type: 'one-time' });
      }
      if (dataConfig.module === 'Virtual Assistance') {
        if (dataConfig.assistanceHours === 20) lines.push({ label: 'Virtual assistance 20h/month', amount: prices.data.assistance['20 hours/month'], type: 'monthly' });
        if (dataConfig.assistanceHours === 40) lines.push({ label: 'Virtual assistance 40h/month', amount: prices.data.assistance['40 hours/month'], type: 'monthly' });
        if (dataConfig.assistanceAutomation) lines.push({ label: 'Automation add-on', amount: prices.data.assistance.automationAddon, type: 'one-time' });
      }
    }



    if (service === 'Creative') {
      creativeConfig.items.forEach((qty, key) => {
        if (qty > 0) lines.push({ label: `${key} x${qty}`, amount: qty * prices.creative[key as keyof typeof prices.creative], type: 'one-time' });
      });
    }

    if (service === 'Training') {
      if (trainingConfig.individuals > 0) lines.push({ label: `Individual course x${trainingConfig.individuals}`, amount: trainingConfig.individuals * prices.training.individualPerPerson, type: 'one-time' });
      if (trainingConfig.workshops > 0) lines.push({ label: `Corporate workshop x${trainingConfig.workshops}`, amount: trainingConfig.workshops * prices.training.corporateWorkshop, type: 'one-time' });
    }

    monthlyAddons.forEach((m) => lines.push({ label: `${m} (monthly)`, amount: prices.monthly[m as keyof typeof prices.monthly], type: 'monthly' }));

    const oneTimeTotal = lines.filter((l) => l.type === 'one-time').reduce((s, l) => s + l.amount, 0);
    const monthlyTotal = lines.filter((l) => l.type === 'monthly').reduce((s, l) => s + l.amount, 0);
    return { lines, oneTimeTotal, monthlyTotal };
  }, [service, buildType, webConfig, appConfig, dataConfig, creativeConfig, trainingConfig, monthlyAddons]);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-serif">Pricing</h2>
        <p className="mt-2 text-brand-black/70">All prices in NAD. Choose a service and configure options.</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card variant="outline" className="lg:col-span-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Service" name="service" as="select" value={service} onChange={(e) => setService(e.target.value as ServiceCategory)}>
                  <option>Digital Products</option>
                  <option>Data & Analytics</option>
                  <option>Templates</option>
                  <option>Creative</option>
                  <option>Training</option>
                </FormField>

                <FormField label="Build Type" name="buildType" as="select" value={buildType} onChange={(e) => setBuildType(e.target.value as BuildType)}>
                  <option>Custom build</option>
                  <option>Template-based</option>
                </FormField>
              </div>

              {service === 'Digital Products' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {buildType === 'Custom build' && (
                    <>
                      <FormField label="Static pages" name="staticPages" as="input" type="number" value={String(webConfig.staticPages)} onChange={(e) => setWebConfig({ ...webConfig, staticPages: Number(e.target.value) })} />
                      <FormField label="Content-heavy pages" name="contentPages" as="input" type="number" value={String(webConfig.contentPages)} onChange={(e) => setWebConfig({ ...webConfig, contentPages: Number(e.target.value) })} />
                      <div className="md:col-span-2">
                        <div className="text-sm font-medium text-brand-black">Features</div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {['Contact form','Blog system','CMS / Admin','User auth','Payment integration','Booking system','Multilingual','API integration'].map((f) => {
                            const checked = webConfig.features.has(f);
                            return (
                              <label key={f} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => {
                                    const next = new Set(webConfig.features);
                                    if (checked) next.delete(f); else next.add(f);
                                    setWebConfig({ ...webConfig, features: next });
                                  }}
                                />
                                <span>{f}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      {webConfig.features.has('API integration') && (
                        <div className="text-sm text-gray-500 italic mt-2">
                          API integration cost is estimated at N$4,500
                        </div>
                      )}
                    </>
                  )}

                  {/* Template-based option removed as per requirements */}
                </div>
              )}

              {service === 'Digital Products' && buildType === 'Custom build' && (
                <div className="mt-6">
                  <div className="text-sm font-medium text-brand-black">App features</div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Simple screens" name="simpleScreens" as="input" type="number" value={String(appConfig.simpleScreens)} onChange={(e) => setAppConfig({ ...appConfig, simpleScreens: Number(e.target.value) })} />
                    <FormField label="Interactive screens" name="interactiveScreens" as="input" type="number" value={String(appConfig.interactiveScreens)} onChange={(e) => setAppConfig({ ...appConfig, interactiveScreens: Number(e.target.value) })} />
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {['User authentication','Payments','Notifications','Admin dashboard','3rd-party API'].map((f) => {
                        const checked = appConfig.features.has(f);
                        return (
                          <label key={f} className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {
                                const next = new Set(appConfig.features);
                                if (checked) next.delete(f); else next.add(f);
                                setAppConfig({ ...appConfig, features: next });
                              }}
                            />
                            <span>{f}</span>
                          </label>
                        );
                      })}
                    </div>
                    {appConfig.features.has('3rd-party API') && (
                      <FormField label="3rd-party API amount (N$)" name="apiRange" as="input" type="number" value={String(appConfig.apiRange)} onChange={(e) => setAppConfig({ ...appConfig, apiRange: Number(e.target.value) })} />
                    )}
                  </div>
                </div>
              )}

              {service === 'Data & Analytics' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Module" name="module" as="select" value={dataConfig.module} onChange={(e) => setDataConfig({ ...dataConfig, module: e.target.value as any })}>
                    <option>Analytics</option>
                    <option>Data Science</option>
                    <option>Engineering</option>
                    <option>Cybersecurity</option>
                    <option>Virtual Assistance</option>
                  </FormField>

                  {dataConfig.module === 'Analytics' && (
                    <>
                      <FormField label="Data sources" name="dataSources" as="input" type="number" value={String(dataConfig.dataSources)} onChange={(e) => setDataConfig({ ...dataConfig, dataSources: Number(e.target.value) })} />
                      <FormField label="Dashboard" name="dashboardType" as="select" value={dataConfig.dashboardType} onChange={(e) => setDataConfig({ ...dataConfig, dashboardType: e.target.value as any })}>
                        <option>None</option>
                        <option>Simple</option>
                        <option>Advanced</option>
                      </FormField>
                      <div className="md:col-span-2">
                        <div className="text-sm font-medium text-brand-black">Add-ons</div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {['Automated refresh','Forecasting','Custom APIs','Monthly reporting logic'].map((a) => {
                            const checked = dataConfig.addons.has(a);
                            return (
                              <label key={a} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => {
                                    const next = new Set(dataConfig.addons);
                                    if (checked) next.delete(a); else next.add(a);
                                    setDataConfig({ ...dataConfig, addons: next });
                                  }}
                                />
                                <span>{a}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {dataConfig.module === 'Data Science' && (
                    <>
                      <FormField label="Model type" name="modelType" as="select" value={dataConfig.modelType} onChange={(e) => setDataConfig({ ...dataConfig, modelType: e.target.value as any })}>
                        <option>None</option>
                        <option>Descriptive</option>
                        <option>Predictive</option>
                        <option>Advanced ML</option>
                      </FormField>
                      <FormField label="Data size" name="dataSize" as="select" value={dataConfig.dataSize} onChange={(e) => setDataConfig({ ...dataConfig, dataSize: e.target.value as any })}>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </FormField>
                    </>
                  )}

                  {dataConfig.module === 'Engineering' && (
                    <>
                      <div className="md:col-span-2">
                        <div className="text-sm font-medium text-brand-black">Pipelines</div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {['Simple ETL','Automated pipeline'].map((p) => {
                            const checked = dataConfig.pipelines.has(p);
                            return (
                              <label key={p} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => {
                                    const next = new Set(dataConfig.pipelines);
                                    if (checked) next.delete(p); else next.add(p);
                                    setDataConfig({ ...dataConfig, pipelines: next });
                                  }}
                                />
                                <span>{p}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-sm font-medium text-brand-black">Storage</div>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {['Database setup','Cloud data warehouse'].map((s) => {
                            const checked = dataConfig.storage.has(s);
                            return (
                              <label key={s} className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => {
                                    const next = new Set(dataConfig.storage);
                                    if (checked) next.delete(s); else next.add(s);
                                    setDataConfig({ ...dataConfig, storage: next });
                                  }}
                                />
                                <span>{s}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {dataConfig.module === 'Cybersecurity' && (
                    <>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={dataConfig.monitoringMonthly}
                          onChange={() => setDataConfig({ ...dataConfig, monitoringMonthly: !dataConfig.monitoringMonthly })}
                        />
                        <span>Monthly monitoring</span>
                      </label>
                    </>
                  )}

                  {dataConfig.module === 'Virtual Assistance' && (
                    <>
                      <FormField label="Hours per month" name="assistanceHours" as="select" value={String(dataConfig.assistanceHours)} onChange={(e) => setDataConfig({ ...dataConfig, assistanceHours: Number(e.target.value) })}>
                        <option value="0">0</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                      </FormField>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={dataConfig.assistanceAutomation}
                          onChange={() => setDataConfig({ ...dataConfig, assistanceAutomation: !dataConfig.assistanceAutomation })}
                        />
                        <span>Automation add-on</span>
                      </label>
                    </>
                  )}
                </div>
              )}

              {service !== 'Training' && (
                <div className="mt-8">
                  <div className="text-sm font-medium text-brand-black">Monthly add-ons</div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {['Hosting','Maintenance','Analytics','Security'].map((m) => {
                      const checked = monthlyAddons.has(m);
                      return (
                        <label key={m} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              const next = new Set(monthlyAddons);
                              if (checked) next.delete(m); else next.add(m);
                              setMonthlyAddons(next);
                            }}
                          />
                          <span>{m}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Templates section removed */}

              {service === 'Creative' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from(creativeConfig.items.keys()).map((k) => {
                    const qty = creativeConfig.items.get(k) || 0;
                    return (
                      <FormField
                        key={k}
                        label={`${k} (qty)`}
                        name={k}
                        as="input"
                        type="number"
                        value={String(qty)}
                        onChange={(e) => {
                          const next = new Map(creativeConfig.items);
                          next.set(k, Number(e.target.value));
                          setCreativeConfig({ items: next });
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {service === 'Training' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Individuals" name="individuals" as="input" type="number" value={String(trainingConfig.individuals)} onChange={(e) => setTrainingConfig({ ...trainingConfig, individuals: Number(e.target.value) })} />
                  <FormField label="Corporate workshops" name="workshops" as="input" type="number" value={String(trainingConfig.workshops)} onChange={(e) => setTrainingConfig({ ...trainingConfig, workshops: Number(e.target.value) })} />
                </div>
              )}
            </form>
          </Card>

          <Card variant="elevated" className="lg:col-span-1">
            <div className="text-sm text-brand-black/60">Summary</div>
            <div className="mt-4 space-y-2">
              {breakdown.lines.length === 0 ? (
                <div className="text-sm text-brand-black/60">No items selected</div>
              ) : (
                breakdown.lines.map((l, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <span>{l.label}</span>
                    <span className="font-medium">N${l.amount.toLocaleString('en-US')}</span>
                  </div>
                ))
              )}
            </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span>One-time total</span>
                <span className="text-xl font-semibold">N${breakdown.oneTimeTotal.toLocaleString('en-US')}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>Monthly total</span>
                <span className="text-lg font-semibold">N${breakdown.monthlyTotal.toLocaleString('en-US')}</span>
              </div>
              <div className="mt-3 text-xs text-brand-black/50">
                Estimated quotation. Final price may vary after discovery.
              </div>
            <div className="mt-6 flex gap-3">
                <Button href="/contact">Get quotation</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const doc = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Quotation</title>
  <style>
    body { font-family: ui-sans-serif, system-ui; color: #111827; padding: 24px; }
    h1 { font-size: 24px; margin: 0 0 8px; }
    .muted { color: #6B7280; font-size: 14px; }
    .line { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F3F4F6; }
    .totals { margin-top: 16px; }
    .totals div { display: flex; justify-content: space-between; padding: 6px 0; }
    .brand { color: #BD1E1E; }
    @media print { .print-hide { display: none; } }
    .actions { margin-top: 24px; }
    .actions button { padding: 8px 12px; border: 1px solid #E5E7EB; border-radius: 6px; background: white; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Welwitschia Data • Quotation</h1>
  <div class="muted">Generated on ${new Date().toLocaleDateString()}</div>
  <div class="muted" style="margin-top:8px">Service: ${service} • Build Type: ${buildType}</div>
  <div style="margin-top:16px">
    ${breakdown.lines.map(l => `<div class="line"><span>${l.label}</span><span>N$${l.amount.toLocaleString('en-US')}${l.type === 'monthly' ? ' / mo' : ''}</span></div>`).join('')}
  </div>
  <div class="totals">
    <div><strong>One-time total</strong><strong>N$${breakdown.oneTimeTotal.toLocaleString('en-US')}</strong></div>
    <div><span>Monthly total</span><span>N$${breakdown.monthlyTotal.toLocaleString('en-US')}</span></div>
  </div>
  <div class="muted" style="margin-top:12px">Estimated quotation. Final price may vary after discovery.</div>
  <div class="actions print-hide">
    <button onclick="window.print()">Print / Save as PDF</button>
  </div>
</body>
</html>`;
                    const w = window.open('', '_blank');
                    if (w) {
                      w.document.open();
                      w.document.write(doc);
                      w.document.close();
                    }
                  }}
                >
                  Preview PDF
                </Button>
              </div>
              <div className="mt-8">
                <div className="text-sm font-medium text-brand-black">Get quotation by email</div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget as HTMLFormElement);
                    const name = String(fd.get('name') || '');
                    const email = String(fd.get('email') || '');
                    const company = String(fd.get('company') || '');
                    const payload = {
                      name,
                      email,
                      subject: 'Welwitschia Data • Quotation',
                      message: `Quotation request from ${company || 'N/A'}\n\nOne-time total: N$${breakdown.oneTimeTotal}\nMonthly total: N$${breakdown.monthlyTotal}\n\nBreakdown:\n${breakdown.lines.map(l => `- ${l.label}: N$${l.amount} (${l.type})`).join('\n')}`,
                      html: `
                        <h2>Welwitschia Data • Quotation</h2>
                        <p><strong>Service:</strong> ${service} • <strong>Build Type:</strong> ${buildType}</p>
                        <ul>
                          ${breakdown.lines.map(l => `<li>${l.label}: N$${l.amount.toLocaleString('en-US')}${l.type === 'monthly' ? ' / mo' : ''}</li>`).join('')}
                        </ul>
                        <p><strong>One-time total:</strong> N$${breakdown.oneTimeTotal.toLocaleString('en-US')}<br/>
                        <strong>Monthly total:</strong> N$${breakdown.monthlyTotal.toLocaleString('en-US')}</p>
                        <p style="color:#6B7280">Estimated quotation. Final price may vary after discovery.</p>
                      `
                    };
                    try {
                      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                      const json = await res.json();
                      if (json.ok) {
                        alert('Quotation sent. We will follow up by email.');
                      } else {
                        alert('Failed to send quotation. Please try again or contact us.');
                      }
                    } catch {
                      alert('Network error. Please try again later.');
                    }
                  }}
                  className="mt-3 grid grid-cols-1 gap-3"
                >
                  <input name="name" placeholder="Your name" className="border border-gray-200 rounded-md px-3 py-2 text-sm" required />
                  <input name="email" placeholder="Your email" className="border border-gray-200 rounded-md px-3 py-2 text-sm" required />
                  <input name="company" placeholder="Company (optional)" className="border border-gray-200 rounded-md px-3 py-2 text-sm" />
                  <Button type="submit">Email me a quotation</Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
