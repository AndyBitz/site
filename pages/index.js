// packages
import Link from 'next/link'
import { Component } from 'react'
import List from '../components/list'
import Layout from '../components/layout'
import Profile from '../components/profile'


export default () => (
  <Layout>
    <Profile />
    <List />
  </Layout>
)
