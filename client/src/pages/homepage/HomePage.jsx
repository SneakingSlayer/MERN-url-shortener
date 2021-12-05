import React, {useContext} from 'react'
import {Context} from '../../context/Context'
import Hpnavbar from '../../components/homepage/navbar/Hpnavbar'
import Hphero from '../../components/homepage/hero/Hphero'
import Layout from '../../components/homepage/layout/Layout'
import Hpcta from '../../components/homepage/cta/Hpcta'
import Hpfooter from '../../components/homepage/footer/Hpfooter'
import Hpfaq from '../../components/homepage/faq/Hpfaq'
import Hpurlshortener from '../../components/homepage/urlshortener/Hpurlshortener'
import Hpinnercontent from '../../components/homepage/innercontent/Hpinnercontent'
import { Navigate } from 'react-router-dom'
export default function HomePage() {
    const {user} = useContext(Context)
    if(user !== null)
        return <Navigate to="/dashboard"/>
    return (
        <>
            <Hpnavbar/>
            <Layout>
                <Hphero />
            </Layout>
            <Hpurlshortener/>
            <Layout>
                <Hpinnercontent />
                <Hpfaq/>
            </Layout>
            <Hpcta/>
            <Hpfooter/>

            
        </>
    )
}
