import { BlogPage, UnauthCase, WithAuthCase } from "../components"

function BlogsPage() {
  const auth = localStorage.getItem('user')
  return (
    <>
        {auth ? (
          <WithAuthCase/>
        ) : (
          <UnauthCase/>
        )}
        <BlogPage/>
    </>
  )
}

export default BlogsPage