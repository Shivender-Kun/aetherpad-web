import { PageHeader, PageWrapper } from "@/app/(authorized)/_components/page";
import ProfileComponent from "./ProfileComponent";

export const dynamic = "force-dynamic";

const Profile = () => {
  return (
    <PageWrapper>
      <PageHeader title="Profile" />
      <ProfileComponent />
    </PageWrapper>
  );
};

export default Profile;
