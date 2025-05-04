import { DraftTemplatesProvider } from "./draft-templates.provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props) {
  return <DraftTemplatesProvider>{props.children}</DraftTemplatesProvider>;
}
