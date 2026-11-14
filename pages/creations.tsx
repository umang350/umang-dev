import type { GetServerSideProps } from 'next'

// This page was retired. Return a real 404 (not a 200 "soft 404").
export const getServerSideProps: GetServerSideProps = async () => ({ notFound: true })

export default function Creations() {
  return null
}
