"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {useActionState, useState} from "react";
import UploadAction from "@/app/products/upload/action";

export default function AddProduct() {
    const imageExtension = ["png", "jpg", "jpeg"];
    const [preview, setPreview] = useState("");

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {files}} = e;

        if (!files || !files.length) return;

        const file = files[0];

        if (1024 * 1024 * 25 < file.size) {
            alert("파일용량이 너무 커요..");
            return;
        }

        const extension = file.name.split(".").pop()
        if (!extension || !imageExtension.includes(extension)) {
            alert("이미지 파일이 아니네요.");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    }

    const [state, dispatch] = useActionState(UploadAction, null)
    console.log(state);

    return <div>
        <form action={dispatch} className="flex flex-col gap-3">
            <label htmlFor={"photo"} className={"border-2 aspect-square flex flex-col items-center justify-center cursor-pointer text-neutral-300 border-neutral-300 " +
                "rounded-md border-dashed bg-center bg-cover"}
                style={{
                    backgroundImage: `url(${preview})`
                }}
            >
                {!preview ?
                    <>
                        <PhotoIcon className={"w-20"} />
                        <div className={"text-neutral-400 text-sm"}>
                            사진을 추가해주세요
                        </div>
                    </>
                : null}
            </label>
            <input onChange={onImageChange} type={"file"} name={"file"} className={"hidden"} id={"photo"} />
            <Input
                name="title"
                type="text"
                placeholder="상품명"
                required
                errors={state?.fieldErrors.title}
                maxLength={50}
            />
            <Input
                name="description"
                type="text"
                placeholder="설명"
                required
                errors={state?.fieldErrors.description}
                maxLength={255}
            />
            <Input
                name="price"
                type="number"
                placeholder="가격"
                required
                errors={state?.fieldErrors.price}
            />
            <Button text="등록하기"/>
        </form>
    </div>
}