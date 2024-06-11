import TestList from "../../ui/test/testFetch"
import TestListClient from "../../ui/test/testList"

export default async function Test({ params }: { params: { tipo: string } }){
    const tests = await TestList({ type: params.tipo }); 
    return(
            <div className="min-h-screen">
                <TestListClient tests={tests} type={params.tipo} />
            </div>
    )
}