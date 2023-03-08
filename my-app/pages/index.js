import Head from 'next/head'
import {Contract, providers, utils} from  "ethers"
import styles from '@/styles/Home.module.css'
import React, { useEffect, useRef, useState} from "react"
import Web3Modal from "web3modal"
import { abi, NFT_CONTRACT_ADDRESS} from "../constants"


export default function Home() {

  const [walletConnected, setWalletConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenIdMinted, setTokenIdMinted] = useState("0")
  const web3ModalRef = useRef()

  const publicMint = async() => {
    try{
      console.log("Public mint")
      const signer = await providerOrSigner(true)

      const newNftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, signer)
      const txn = await newNftContract.mint({
        value: utils.parseEther("0.01"),
      })

      setLoading(true)
      await txn.wait()

      setLoading(false)
      window.alert("Umefaulu kuchimba hela ya LW3Punk")

    } catch (e) {
      console.error(e)
    }
  }

  const connectWallet = async () => {
    try{
      await providerOrSigner()
      setWalletConnected(true)

    } catch (e) {
      console.error(e)
    }
  }

  const getTokenIdMinted = async () => {
    try{
      const provider = await providerOrSigner()
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, abi, provider)
      const _tokenIds = await nftContract.tokenIds()
      console.log("tokeIds", _tokenIds)
      setTokenIdMinted(_tokenIds.toString())

    } catch (e) {
      console.error(e)
    }
  }

  const providerOrSigner = async (needSigner = false) => {

    const provider = await web3ModalRef.current.connect()
    const web3Provider = new providers.Web3Provider(provider)

    const {chainId} = await web3Provider.getNetwork()
    if(chainId !==80001) {
      window.alert("Badilisha network  iwe Mumbai")
      throw new Error("Badilisha network iwe Mumbai")
    }

    if(needSigner) {
      const signer = web3Provider.getSigner()

      return signer
    }
    return web3Provider
  }

  useEffect(() => {
    if(!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false
      })

      connectWallet()
      getTokenIdMinted()

      setInterval(async function () {
        await getTokenIdMinted()
      }, 5 *1000)
    }
  }, [walletConnected])


  const render = () => {
    if(!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Unganisha kibeti chako
        </button>
      )
    }

    if (loading) {
      return <button className={styles.button} onClick={publicMint}>
        Public Mint
      </button>
    }
  }





  return (
   <div>
    <Head>
      <title>LW3Punks</title>
      <meta name="description" content="LW3Punk Dapp"/>
      <link  rel="icon" href="/favicon.ico"/>
    </Head>

    <div className={styles.main}>
      <div>
        <h1 className={styles.title}>Welcome to Web3 Punks!</h1>
        <div className={styles.description}>
          It&#39;s an NFT collection for Lean Web students
        </div>
        <div className={styles.description
        }>
          {tokenIdMinted}/10 have been minted
        </div>
        {render()}
      </div>
      <div>
        <img className={styles.image} src="./LW3punks/1.png"/>
      </div>
    </div>
    <footer className={styles.footer}>Made with &#10084; by Crypto Punks</footer>
   </div>
  )
}
