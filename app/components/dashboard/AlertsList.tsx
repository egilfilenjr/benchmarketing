'use client';

import { useEffect, useState } from 'react';
import { AlertManager } from '@/app/lib/alerts';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Alert {
  id: string;
  metric: string;
  value: number;
  threshold: number;
  platform: string;
  status: 'active' | 'resolved';
  createdAt: string;
}

export default function AlertsList() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const alertManager = new AlertManager();
        const activeAlerts = await alertManager.getAlerts('current-team-id', 'active'); // TODO: Get from auth context
        setAlerts(activeAlerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const handleDismiss = async (alertId: string) => {
    try {
      const alertManager = new AlertManager();
      await alertManager.resolveAlert('current-team-id', alertId); // TODO: Get from auth context
      setAlerts(alerts.filter(alert => alert.id !== alertId));
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  if (loading) {
    return <div>Loading alerts...</div>;
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-6">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Active Alerts</h3>
        <p className="mt-1 text-sm text-gray-500">
          Everything is running within expected parameters.
        </p>
      </div>
    );
  }

  const formatMetricValue = (value: number, metric: string): string => {
    if (metric.toLowerCase().includes('rate') || metric.toLowerCase().includes('percentage')) {
      return `${(value * 100).toFixed(1)}%`;
    }
    if (metric.toLowerCase().includes('cost') || metric.toLowerCase().includes('spend')) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
    return value.toFixed(2);
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="bg-red-50 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">
                {alert.platform} Alert: {alert.metric}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Current value: {formatMetricValue(alert.value, alert.metric)}
                  <br />
                  Threshold: {formatMetricValue(alert.threshold, alert.metric)}
                </p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md bg-red-50 text-red-500 hover:text-red-600"
                onClick={() => handleDismiss(alert.id)}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 