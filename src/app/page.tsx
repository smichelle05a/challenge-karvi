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
        setFilteredProducts(data.items)
        setFilterOptions({
          brand: data.availableFilters.brand.map(brand => brand.name),
          city: data.availableFilters.city.map(city => city.name),
          model: data.availableFilters.model.map(model => model.name),
          version: data.availableFilters.version.map(version => version.name),
          year: data.availableFilters.year.map(year => year.name),
        })
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
  const [filteredProducts, setFilteredProducts] = useState<{ [key: string]: any }[]>(data.items)

  const [appliedFilters, setAppliedFilters] = useState<{ [key: string]: string | number | null }>({})
  
    const [sorting, setSorting] = useState<{ value: 'relevant' | 'asc' | 'desc'; text: string }>({ value: 'relevant', text: 'Más relevantes' })

  const [activeAccordion, setActiveAccordion] = useState<string | number>('')

  useEffect(() => {
    setFilterOptions({
      brand: data.availableFilters.brand.map(brand => brand.name),
      city: data.availableFilters.city.map(city => city.name),
      model: data.availableFilters.model.map(model => model.name),
      version: data.availableFilters.version.map(version => version.name),
      year: data.availableFilters.year.map(year => year.name),
    }) 
  }, [data.availableFilters])

  //!BORRAR CONSOLE.LOG
  console.log({ appliedFilters, filteredProducts, filterOptions })

  const handleFilterClick = (key: string, value: string | number) => {
    const filters = {
      ...appliedFilters,
      [key]: value,
    }
    setAppliedFilters(filters)
    Object.keys(filters).forEach((filterKey) => {
      onFilterProducts(filteredProducts, filterKey, filters[filterKey])
    })
  }

  const handleRemoveFilter = (key: string) => {
    const filters = {...appliedFilters}
    delete filters[key]
    setAppliedFilters(filters)

    if(!Object.keys(filters).length) handleResetFilters()

    Object.keys(filters).forEach((filterKey) => {
      onFilterProducts(data.items, filterKey, filters[filterKey])
    })
  }

  const handleResetFilters = () => {
    setAppliedFilters({})
    setFilterOptions({
      brand: data.availableFilters.brand.map(brand => brand.name),
      city: data.availableFilters.city.map(city => city.name),
      model: data.availableFilters.model.map(model => model.name),
      version: data.availableFilters.version.map(version => version.name),
      year: data.availableFilters.year.map(year => year.name),
    })
    setFilteredProducts(data.items)
  }

  const onFilterProducts = (list: { [key: string]: any }[], key: string, value: any) => setFilteredProducts(list.filter(product => product[key].includes(value)))

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
          <div className={homeStyles['filters-container']}>
            {Object.keys(filterOptions).map((key, i) => (
              <Accordion id={key} key={i} handleToggle={handleToggleAccordion} isOpen={activeAccordion === key} {...(!!appliedFilters[key] && { className: 'd-none' })}>
                <Accordion.Header>{key}</Accordion.Header>
                <Accordion.Body>
                  {filterOptions[key].map((value, i) => (
                    <p key={i} onClick={() => handleFilterClick(key, value)}>
                      {value}
                    </p>
                  ))}
                </Accordion.Body>
              </Accordion>
            ))}
          </div>
        </div>
        <div className={homeStyles['results-container']}>
          <div className={homeStyles['applied-filters-container']}>
            <div className={homeStyles['applied-filters']}>
              {Object.keys(appliedFilters).map(
                (key, i) =>
                  !!appliedFilters[key] && (
                    <Chip key={i} onClose={() => handleRemoveFilter(key)}>
                      {appliedFilters[key]}
                    </Chip>
                  )
              )}
            </div>
            <Button buttonType='link' title='Limpiar Filtros' onClick={() => handleResetFilters()}>
              <TrashIcon width={20} height={20} /> Limpiar Filtros
            </Button>
          </div>
          <div className={homeStyles['counter-and-sorting']}>
            <div className={homeStyles['counter']}>{filteredProducts.length.toLocaleString()} Carros encontrados</div>
            <div className={homeStyles['sorting']}>
              <Button buttonType='link'>
                {' '}
                <Arrows width={20} height={20} /> {sorting.text}
              </Button>
            </div>
          </div>
          <div className={homeStyles['results']}>
            {filteredProducts &&
              filteredProducts.map((item: { [key: string]: any }, i: number) => {
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
