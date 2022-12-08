import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'


export default  function Home() {
  interface Data {
    text: string;
  }
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    setLoading(true);
    
    const response = await fetch('/api/gpt',{
      method: 'POST',
      body: JSON.stringify({prompt : dataObj.prompt}),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const result = await response.json();
    setData(result);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="prompt" />
          <button type='submit'>Submit</button>
        </form>
        {loading? <div> <h1>Loading...</h1>
        <h3>It may take a minute or two ...</h3> </div> :null}
        <ReactMarkdown>{data}</ReactMarkdown>
        </main>
    </div>
  )
}
