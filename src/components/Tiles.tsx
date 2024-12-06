import { FC } from "react";

type Props = {
    children: string;
}

export const Tiles: FC<Props> = ({children}) => (
    <p style={{fontFamily: "Tiles", fontSize: "5rem"}}>{children}</p>
);