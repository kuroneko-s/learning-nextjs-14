"use client";

import FormButton from "@/components/FormBtn";
import FormInput from "@/components/FormInput";
import SocialLogin from "@/components/SocialLogin";
import {LoginAction} from "@/app/login/action";
import {useActionState} from "react";

export default function LogIn() {
    const [state, action] = useActionState(LoginAction,  null)

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Log in with email and password.</h2>
            </div>
            <form action={action} className="flex flex-col gap-3">
                <FormInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    errors={[]}
                />
                <FormInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    errors={state.error ?? []}
                />
                <FormButton text="Log in"/>
            </form>
            <SocialLogin/>
        </div>
    );
}