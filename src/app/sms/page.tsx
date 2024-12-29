"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import {SmsLoginAction} from "@/app/sms/action";
import {useActionState} from "react";

const initialState = {
    token: false,
    payload: {
        phone: "",
        token: null
    }
}

export default function SMSLogin() {
    const [state, dispatch] = useActionState(SmsLoginAction, initialState);

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS Log in</h1>
                <h2 className="text-xl">Verify your phone number.</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                <Input name="phone"
                       type="text"
                       placeholder="Phone number"
                       defaultValue={state.payload.phone}
                       required
                />
                {state.token ?
                    <Input
                        name="token"
                        type="number"
                        placeholder="Verification code"
                        required
                        defaultValue={state.payload?.token ?? ""}
                        min={100000}
                        max={999999}
                    />
                    : null
                }
                <Button text="Verify"/>
            </form>
        </div>
    );
}