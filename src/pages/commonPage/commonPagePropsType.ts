import {ReactNode} from "react";

type ChildComponents = {
    header?: ReactNode;
    modal?: ReactNode;
    middle?: ReactNode;
    footer?: ReactNode;
};

export type CommonPagePropsType = {
    children: ChildComponents;
    hasHeaderContent: boolean;
};
