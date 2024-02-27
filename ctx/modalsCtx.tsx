import { ProductsType } from "@/utils/schemas/EmploymentSchema";
import { UserType } from "@/utils/schemas/UserSchema";
import React from "react"

export interface ValuesModalsDataTypes {
    modalFacturation: boolean,
    modalClient: boolean,
    modalSelectProduct: boolean,
    modalAddClient: boolean,
    modalAddFacturation: boolean,
    modalAddProduct: boolean,
    modalProduct: boolean,
    modalProductData: ProductsType,
    modalClientData: UserType,
    modalFactureDataID: number,
    mobNav: boolean,

    setmobNav: React.Dispatch<React.SetStateAction<boolean>>,
    setmodalFactureDataID: React.Dispatch<React.SetStateAction<number>>,
    setmodalAddClient: React.Dispatch<React.SetStateAction<boolean>>,
    setmodalAddFacturation: React.Dispatch<React.SetStateAction<boolean>>,
    setmodalSelectProduct: React.Dispatch<React.SetStateAction<boolean>>,
    setmodalAddProduct: React.Dispatch<React.SetStateAction<boolean>>,
    setmodalClient: React.Dispatch<React.SetStateAction<boolean>>,
    setmodalProduct: React.Dispatch<React.SetStateAction<boolean>>,
    setModalProductData: React.Dispatch<React.SetStateAction<ProductsType>>,
    setmodalClientData: React.Dispatch<React.SetStateAction<UserType>>,
    setmodalFacturation: React.Dispatch<React.SetStateAction<boolean>>
}
export const RootModalsContext = React.createContext<ValuesModalsDataTypes>({} as ValuesModalsDataTypes);

export const RootModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalFacturation, setmodalFacturation] = React.useState<boolean>(false)
    const [modalClient, setmodalClient] = React.useState<boolean>(false)
    const [modalProduct, setmodalProduct] = React.useState<boolean>(false)
    const [mobNav, setmobNav] = React.useState<boolean>(false)

    const [modalAddClient, setmodalAddClient] = React.useState<boolean>(false)
    const [modalAddFacturation, setmodalAddFacturation] = React.useState<boolean>(false)
    const [modalAddProduct, setmodalAddProduct] = React.useState<boolean>(false)
    const [modalSelectProduct, setmodalSelectProduct] = React.useState<boolean>(false)

    const [modalProductData, setModalProductData] = React.useState<ProductsType>({} as ProductsType)
    const [modalFactureDataID, setmodalFactureDataID] = React.useState<number>(0)
    const [modalClientData, setmodalClientData] = React.useState<UserType>({} as UserType)

    return <RootModalsContext.Provider value={{
        modalFacturation, setmodalFacturation,
        modalProductData, setModalProductData, modalProduct, setmodalProduct, modalClient,
        setmodalClient,
        modalAddClient, setmodalAddClient,
        modalAddFacturation, setmodalAddFacturation,
        modalAddProduct, setmodalAddProduct, modalClientData,
        setmodalClientData, modalSelectProduct, mobNav, setmobNav,
        setmodalSelectProduct, modalFactureDataID, setmodalFactureDataID
    }}>
        {children}
    </RootModalsContext.Provider>
}