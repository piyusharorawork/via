import { DraftSingleTemplateProvider } from "./draft-single-template.provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return (
    <DraftSingleTemplateProvider>{props.children}</DraftSingleTemplateProvider>
  );
}
