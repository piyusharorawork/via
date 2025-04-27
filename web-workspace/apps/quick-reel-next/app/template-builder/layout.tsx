import { TemplateBuilderProvider } from "./store/template-builder.provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return <TemplateBuilderProvider>{props.children}</TemplateBuilderProvider>;
}
