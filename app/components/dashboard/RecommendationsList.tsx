'use client';

import { useEffect, useState } from 'react';
import { RecommendationsEngine } from '@/app/lib/ai/recommendations';
import { LightBulbIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  potentialImpact: string;
  suggestedActions: string[];
}

export default function RecommendationsList() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const engine = new RecommendationsEngine();
        const recs = await engine.generateRecommendations('current-team-id'); // TODO: Get from auth context
        setRecommendations(recs);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-6">
        <LightBulbIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No Recommendations</h3>
        <p className="mt-1 text-sm text-gray-500">
          We'll analyze your data and provide recommendations soon.
        </p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <div key={rec.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                  {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                </span>
                <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
              </div>
              <p className="mt-1 text-sm text-gray-500">{rec.description}</p>
              <p className="mt-2 text-sm font-medium text-indigo-600">{rec.potentialImpact}</p>
            </div>
            <button className="ml-4 text-gray-400 hover:text-gray-500">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          {rec.suggestedActions.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-medium text-gray-500">Suggested Actions:</h5>
              <ul className="mt-2 text-sm text-gray-500 list-disc list-inside space-y-1">
                {rec.suggestedActions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 