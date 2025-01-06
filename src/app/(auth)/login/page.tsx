"use client";

import {PASSWORD_MIN_LENGTH} from "@/lib/constants";
import {logIn} from "@/app/(auth)/login/action";
import SocialLogin from "@/components/SocialLogin";
import {useActionState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function LogIn() {
    const [state, dispatch] = useActionState(logIn, null);

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Log in with email and password.</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    errors={state?.fieldErrors.email}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    errors={state?.fieldErrors.password}
                />
                <Button text="Log in"/>
            </form>
            <SocialLogin />
        </div>
    );
}