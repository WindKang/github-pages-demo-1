import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { BackIcon } from "../../shared/BackIcon";
import { TagForm } from "./TagForm";
export const TagCreate = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
  },
  setup: () => {
    //解释
    return () => (
      <MainLayout>
        {{
          title: () => "新增标签",
          icon: () => <BackIcon />,
          default: () => <TagForm />,
        }}
      </MainLayout>
    );
  },
});
