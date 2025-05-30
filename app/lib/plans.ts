import { Team } from '@/app/types';

export type PlanFeature =
  | 'white-label'
  | 'ai-recommendations'
  | 'export'
  | 'alerts'
  | 'multi-account'
  | 'team-members'
  | 'custom-branding'
  | 'api-access';

export type Plan = 'free' | 'pro' | 'pro_plus' | 'agency';

interface PlanConfig {
  name: string;
  price: number;
  features: {
    [K in PlanFeature]?: {
      enabled: boolean;
      limit?: number;
    };
  };
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    name: 'Free',
    price: 0,
    features: {
      'multi-account': { enabled: false },
      'team-members': { enabled: true, limit: 1 },
      'export': { enabled: true },
      'alerts': { enabled: true, limit: 3 },
      'ai-recommendations': { enabled: false },
      'white-label': { enabled: false },
      'custom-branding': { enabled: false },
      'api-access': { enabled: false },
    },
  },
  pro: {
    name: 'Pro',
    price: 49,
    features: {
      'multi-account': { enabled: true, limit: 3 },
      'team-members': { enabled: true, limit: 3 },
      'export': { enabled: true },
      'alerts': { enabled: true, limit: 10 },
      'ai-recommendations': { enabled: true },
      'white-label': { enabled: false },
      'custom-branding': { enabled: false },
      'api-access': { enabled: true },
    },
  },
  pro_plus: {
    name: 'Pro+',
    price: 99,
    features: {
      'multi-account': { enabled: true, limit: 10 },
      'team-members': { enabled: true, limit: 10 },
      'export': { enabled: true },
      'alerts': { enabled: true, limit: 25 },
      'ai-recommendations': { enabled: true },
      'white-label': { enabled: true },
      'custom-branding': { enabled: true },
      'api-access': { enabled: true },
    },
  },
  agency: {
    name: 'Agency',
    price: 299,
    features: {
      'multi-account': { enabled: true, limit: 50 },
      'team-members': { enabled: true, limit: 25 },
      'export': { enabled: true },
      'alerts': { enabled: true, limit: 100 },
      'ai-recommendations': { enabled: true },
      'white-label': { enabled: true },
      'custom-branding': { enabled: true },
      'api-access': { enabled: true },
    },
  },
};

export function hasFeature(team: Team, feature: PlanFeature): boolean {
  const plan = PLANS[team.plan];
  return !!plan.features[feature]?.enabled;
}

export function getFeatureLimit(team: Team, feature: PlanFeature): number | null {
  const plan = PLANS[team.plan];
  return plan.features[feature]?.limit ?? null;
}

export function getPlanPrice(plan: Plan): number {
  return PLANS[plan].price;
}

export function getPlanName(plan: Plan): string {
  return PLANS[plan].name;
} 