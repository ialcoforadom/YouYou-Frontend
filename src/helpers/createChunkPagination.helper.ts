type ChunkPaginationProps = {
  results: any[]
  size: number
}

function createChunkPagination({ results, size }: ChunkPaginationProps) {
  try {
    return results.reduce((acc, item, index) => {
      const chunkIndex = Math.floor(index / Number(size))

      if (!acc[chunkIndex]) {
        return [...acc, [item]]
      }

      acc[chunkIndex].push(item)

      return acc
    }, [])
  } catch (err) {
    console.error(err)

    return []
  }
}

export { createChunkPagination }
