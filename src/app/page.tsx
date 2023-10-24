'use client'
import React, { useState, useEffect } from 'react'
import ProductCard from './components/ProductCard/ProductCard'
import homeStyles from './home.module.scss'
import mock from './data.json'
import Chip from './components/Chip/Chip'
import Button from './components/Button/Button'
import { Arrows, TrashIcon } from './components/Icons'
import { Accordion } from './components/Accordion/Accordion'

const Home = () => {
  const data = mock
  /*   const [data, setData] = useState<{[key: string]: any}>({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://mocki.io/v1/80669021-108d-40c2-9bc9-887a5184b700')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setError(null)
        setLoading(false)
      })
      .catch(err => {
        console.error(`Error fetching data: ${err.message}`)
        setError(err.message)
        setLoading(false)
      })
  },[]) */

  const [filterOptions, setFilterOptions] = useState<{ [key: string]: string[] | number[] }>({
    brand: [],
    city: [],
    model: [],
    version: [],
    year: [],
  })

  const [appliedFilters, setAppliedFilters] = useState<{ [key: string]: string }>({})

  const [activeAccordion, setActiveAccordion] = useState<string | number>('')

  const [sorting, setSorting] = useState<{ value: 'relevant' | 'asc' | 'desc'; text: string }>({ value: 'relevant', text: 'Más relevantes' })

  useEffect(() => {
    setFilterOptions({
      brand: data.availableFilters.brand.map(brand => brand.name),
      city: data.availableFilters.city.map(city => city.name),
      model: data.availableFilters.model.map(model => model.name),
      version: data.availableFilters.version.map(version => version.name),
      year: data.availableFilters.year.map(year => year.name),
    })
  }, [data.availableFilters])

  useEffect(() => {
    setAppliedFilters(prev => ({
      ...prev,
      city: 'Campinas',
      year: '2018',
      brand: 'CHEVROLET',
      model: 'ONIX',
      version: '1.0 MPFI LT 8V FLEX 4P MANUAL',
    }))
  }, [])

  const handleToggleAccordion = (id: string | number) => {
    setActiveAccordion(activeAccordion === id ? '' : id)
  }

  // if (loading) return
  //   <div>Loading...</div>

  // if (error !== null) return
  //   <div>Error: {error}</div>

  return (
    <main className={homeStyles['home']}>
      <section className={`${homeStyles['home-search']} container`}>
        <div className={homeStyles['title']}>
          <h1>Karvi Challenge</h1>
        </div>
        <div className={homeStyles['filters']}>
          {Object.keys(filterOptions).map((key, i) => (
            <Accordion id={key} key={i} handleToggle={handleToggleAccordion} isOpen={activeAccordion === key}>
              <Accordion.Header>{key}</Accordion.Header>
              <Accordion.Body items={filterOptions[key]} />
            </Accordion>
          ))}
        </div>
        <div className={homeStyles['results-container']}>
          <div className={homeStyles['applied-filters-container']}>
            <div className={homeStyles['applied-filters']}>
              {Object.keys(appliedFilters).map((key, i) => (
                <Chip key={i}>{appliedFilters[key]}</Chip>
              ))}
            </div>
            <Button buttonType='link' title='Limpiar Filtros'>
              <TrashIcon width={20} height={20} /> Limpiar Filtros
            </Button>
          </div>
          <div className={homeStyles['counter-and-sorting']}>
            <div className={homeStyles['counter']}>{data.totalCount.toLocaleString()} Carros encontrados</div>
            <div className={homeStyles['sorting']}>
              <Button buttonType='link'> <Arrows width={20} height={20} /> {sorting.text}</Button>
            </div>
          </div>
          <div className={homeStyles['results']}>
            {data &&
              data?.items?.map((item: { [key: string]: any }, i: number) => {
                const { id, city, state, year, brand, model, version, price, mileage, image } = item
                return <ProductCard key={i} productId={id} {...{ city, state, year, brand, model, version, price, mileage, image }} />
              })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home

// import Image from 'next/image'

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>src/app/page.tsx</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{' '}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p>Find in-depth information about Next.js features and API.</p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Learn <span>-&gt;</span>
//           </h2>
//           <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p>Explore the Next.js 13 playground.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//
//   )
// }

