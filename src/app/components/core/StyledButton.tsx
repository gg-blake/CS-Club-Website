import { FC, useState, HTMLProps } from "react";
import GenericButton from "@/app/components/core/GenericButton";

interface StyledButtonProps extends HTMLProps<HTMLDivElement> {
    className?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

const StyledButton: FC<StyledButtonProps> = (props: StyledButtonProps) => {
    return (
        <div {...props}>
        <GenericButton className={`text-sm group transition-all flex items-center gap-0 hover:gap-2 active:hover:bg-transparent border-primary-500 text-primary-500 hover:border-secondary-100 hover:text-secondary-100  hover:bg-primary-500 ${props.className}`}>
        <div className="w-0 h-full group-hover:w-[15px] transition-all overflow-clip">
            {props.icon && props.icon}
        </div>
        { props.children && props.children }
        </GenericButton>
        </div>
    )
}

export default StyledButton;