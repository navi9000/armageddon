import { MyFC } from "@/types"

const GlobalLayout: MyFC<LayoutProps<"/">> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

export default GlobalLayout
