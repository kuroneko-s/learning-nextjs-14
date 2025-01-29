import React from "react";

export default function HomeLayout({children, modal} : {
    children: React.ReactNode,
    modal: React.ReactNode,
}) {
    console.log("children - ", children);
    console.log("modal - ", modal);

 return <>
     {children}
     {modal}
 </>
}
