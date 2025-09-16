import { PageHeader, PageWrapper } from "@/app/(authorized)/_components/page";
import { MAX_LABELS_PER_USER } from "@/constants/dataLimits";
import AddLabelDialog from "./_components/dialog/AddLabelDialog";
import LabelsList from "./_components/LabelsList";

const labelContainerId = "labels-container";

const Labels = () => {
  return (
    <PageWrapper>
      <PageHeader title="Labels">
        <AddLabelDialog />
      </PageHeader>
      <p className="px-3 text-sm text-gray-500">
        Max {MAX_LABELS_PER_USER} labels can be stored
      </p>
      <div className="overflow-auto rounded-lg px-2" id={labelContainerId}>
        <LabelsList parentId={labelContainerId} />
      </div>
    </PageWrapper>
  );
};

export default Labels;
