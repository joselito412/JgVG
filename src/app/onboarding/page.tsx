import { AuthGuard } from '@/modules/auth/components/AuthGuard';
import OnboardingForm from '@/app/onboarding/OnboardingForm';

export default function OnboardingPage() {
  return (
    <AuthGuard requireOnboarding={false}>
      <OnboardingForm />
    </AuthGuard>
  );
}
