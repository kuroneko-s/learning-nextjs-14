"use client"

import Input from "@/components/Input";
import Button from "@/components/Button";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {productSchema, ProductType} from "@/app/products/upload/schema";
import UploadAction from "@/app/products/upload/action";

export default function AddProduct() {
    const imageExtension = ["png", "jpg", "jpeg"];
    const [preview, setPreview] = useState("");
    // const [state, dispatch] = useActionState(UploadAction, null)
    const [file, setFile] = useState<File | null>(null);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<ProductType>({
        resolver: zodResolver(productSchema)
    })

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
        setFile(file);
        setValue("file", ""); // 호출은 되게끔 하기 위해서 빈값 부여.
    }

    const onSubmit = handleSubmit( async (data: ProductType) => {
        // 검증이 끝난 후 호출된다.
        if (!file) return;

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price + "");
        formData.append("description", data.description);
        formData.append("file", file);

        return UploadAction(null, formData);
    });

    const onValid = async () => {
        await onSubmit();
    }

    return <div>
        <form action={onValid} className="flex flex-col gap-3">
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
            {errors?.file?.message ? <span>{errors?.file?.message}</span> : null}
            <Input
                type="text"
                placeholder="상품명"
                {...register("title")}
                errors={[errors?.title?.message ?? ""]}
            />
            <Input
                type="text"
                placeholder="설명"
                {...register("description")}
                errors={[errors?.description?.message ?? ""]}
            />
            <Input
                type="number"
                placeholder="가격"
                {...register("price")}
                errors={[errors?.price?.message ?? ""]}
            />
            <Button text="등록하기"/>
        </form>
    </div>
}