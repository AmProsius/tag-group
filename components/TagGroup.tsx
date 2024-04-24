import { XMarkIcon } from "@heroicons/react/16/solid";
import { cva, VariantProps } from "class-variance-authority";
import {
  Button as AriaButton,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagGroupProps as AriaTagGroupProps,
  TagList as AriaTagList,
  TagListProps as AriaTagListProps,
  TagProps as AriaTagProps,
} from "react-aria-components";

interface TagGroupProps<T>
  extends Omit<AriaTagGroupProps, "children">,
    Pick<AriaTagListProps<T>, "children" | "items" | "renderEmptyState"> {
  label: string;
}

const tagStyles = cva(
  "group relative inline-flex items-center truncate rounded-md bg-[--bg-color] px-2 py-1 text-xs font-medium text-[--text-color] ring-1 ring-inset ring-[--ring-color]",
  {
    variants: {
      color: {
        gray: "[--bg-color:theme('colors.gray.50')] [--ring-color:theme('colors.gray.500/0.1')] [--text-color:theme('colors.gray.600')]",
        sky: "[--bg-color:theme('colors.sky.50')] [--ring-color:theme('colors.sky.500/0.1')] [--text-color:theme('colors.sky.600')]",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  },
);

type TagStyles = VariantProps<typeof tagStyles>;

export const TagGroup = <T extends object>({
  children,
  items,
  label,
  renderEmptyState,
  ...props
}: TagGroupProps<T>) => (
  <AriaTagGroup aria-label={label} {...props}>
    <AriaTagList
      className="flex flex-wrap gap-3"
      items={items}
      renderEmptyState={renderEmptyState}
    >
      {children}
    </AriaTagList>
  </AriaTagGroup>
);

export const Tag: React.FC<Omit<AriaTagProps, "className"> & TagStyles> = ({
  children,
  color,
  id,
  ...props
}) => (
  <AriaTag className={tagStyles({ color })} id={id} {...props}>
    {({ allowsRemoving }) => (
      <>
        {children}
        {allowsRemoving && (
          <AriaButton
            className="absolute inset-y-0 end-0 flex w-full min-w-6 max-w-12 items-center justify-end bg-gradient-to-l from-[--bg-color] from-50% px-1 opacity-0 transition-opacity group-hover:opacity-100"
            slot="remove"
          >
            <XMarkIcon aria-hidden="true" className="size-4" />
            <div className="sr-only">Delete Tag</div>
          </AriaButton>
        )}
      </>
    )}
  </AriaTag>
);
