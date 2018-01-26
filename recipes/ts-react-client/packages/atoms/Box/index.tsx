import * as React from 'react'

interface IBox {
  name: string
}

const Box: React.SFC<IBox> = ({ name }) => <div>{name}</div>

export default Box
