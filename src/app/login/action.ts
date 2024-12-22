"use server";

export async function LoginAction(prevState: any, formData: FormData) {
    console.log(prevState)
    console.log(formData.get("email"), formData.get("password"));

    await new Promise(resolve => setTimeout(resolve, 3000));

    return {
        error: ["hello", "something error"]
    }
}
