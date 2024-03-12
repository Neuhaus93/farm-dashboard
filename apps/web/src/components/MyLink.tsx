import { Link as RouterLink, useLinkProps } from "@tanstack/react-router";
import { Typography } from "antd";
import { omit } from "@/lib/object";

export function MyLink(
  props: React.ComponentPropsWithoutRef<typeof Typography.Link> &
    Pick<React.ComponentPropsWithoutRef<typeof RouterLink>, "to">,
) {
  const { to, ...antLinkProps } = props;
  const linkProps = useLinkProps({ to });

  return <Typography.Link {...omit(linkProps, ["type"])} {...antLinkProps} />;
}
