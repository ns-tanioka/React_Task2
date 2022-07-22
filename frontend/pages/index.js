import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './header'
import Link from 'next/link'
import Layout from '../components/layout'
import MyImage from '../components/image'
import {useState} from 'react'
import useSWR from 'swr'

export default function Home() {
  const [pref , setPref] = useState({id:0, item:'name'})
  const [ address, setAddress ] = useState('/api/hello/' + pref.id + '/' + pref.item)
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, err} = useSWR(address , fetcher) 
  
  const onChange = (e)=> {
    pref.id = e.target.value
    setPref(pref)
    setAddress('/api/hello/' + pref.id + '/' + pref.item)
  }

  const onSelect = (e)=> {
    pref.item = e.target.value
    setPref(pref)
    setAddress('/api/hello/' + pref.id + '/' + pref.item)
  }

  return(
    <div>
    <Layout header="Next.js" title="Top page.">
    <div className="alert alert-primary text-center">
      <h5 className="mb-4">
        { JSON.stringify(data) }
      </h5>
      <input type="number" className="form-control form-control-sm mb-2" onChange={onChange} />
      <select onChange={onSelect} className="form-control form-control-sm">
        <option value="name">Name</option>
        <option value="mail">Mail</option>
        <option value="age">Age</option>
      </select>
    </div>
    </Layout>
    </div>
  )
}
