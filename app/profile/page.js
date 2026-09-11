import ProfileExperience from "./profile-experience";

export const metadata = {
  title: "Discover Your ASCENSION Pathway",
  description: "A private, non-diagnostic profile to help shape your ASCENSION experience in Da Nang.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function ProfilePage() {
  return <ProfileExperience />;
}

