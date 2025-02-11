export default async function page({params}) {
    const {args} = await params;
    console.log(args);

    return <div>hello {args?.join(", ")}</div>
}
