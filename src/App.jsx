import './App.css'
import Header from './components/Header'
import PageContainer from './container/PageContainer'
import RouterConfig from './config/RouterConfig'
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from './redux/slices/appSlice';
import { removeFromBasket } from './redux/slices/basketSlice';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {
  const { products } = useSelector(state => state.basket);
  const { drawer } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const closeDrawer = () => {
    dispatch(toggleDrawer(false));
  }

  const removeItem = (id) => {
    dispatch(removeFromBasket({ id }));
  }

  const totalPrice = products.reduce((total, product) => total + product.price * product.amount, 0);

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
      </PageContainer>
      <Drawer className='drawer' sx={{ padding: '20px' }} anchor='right' open={drawer} onClose={() => closeDrawer()}>
        {
          products.length === 0 ? <h1 style={{
            margin: '30px',
            display: 'flex',
            fontSize: '35px',
            fontWeight: '200',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>No items in the basket!</h1> : (<div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              borderBottom: '1px solid lightgray',
              marginBottom: '10px'
            }}>
              <h3 style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px'
              }}>Checkout {<p style={{ color: 'green', marginLeft: '10px' }}> ${totalPrice.toFixed(2)}</p>}</h3>
              <button style={{
                height: '50px',
                alignSelf: 'center',
                borderRadius: '5px',
                border: 'none',
                padding: '5px 10px',
                backgroundColor: 'green',
                margin: '10px'
              }}>Checkout</button>
            </div>
            {
              products && products.map((product) => {
                return (
                  <div key={product.id} >
                    <div className='flex-row-space-between' style={{ padding: '20px', alignItems: 'start' }}>
                      <img src={product.image} style={{ marginRight: '5px' }} width={'100px'}></img>
                      <div className='flex-column' style={
                        {
                          maxWidth: '200px',
                          marginRight: '5px',
                          justifyContent: 'center',
                          alignSelf: 'center',
                        }
                      }>
                        <p style={{
                          margin: '0px',
                          padding: '0px',
                          textAlign: 'center',
                          display: 'block',
                          textOverflow: 'ellipsis',
                          wordWrap: 'break-word',
                          overflow: 'hidden',
                          maxHeight: '3.6em',
                          lineHeight: '1.8em'

                        }}>{product.title}</p>
                        <p style={{
                          fontWeight: 'bold',
                          margin: '5px',
                          padding: '0px',
                        }}> $ {product.price}</p>
                        <p style={{
                          fontWeight: 'bold',
                          margin: '5px',
                          padding: '0px',
                        }}>X {product.amount}</p>
                        <p style={
                          {
                            color: 'green', fontWeight: 'bold',
                            margin: '10px',
                            padding: '0px',
                          }
                        }>
                          <strong>Total: $ {product.amount * product.price}</strong>
                        </p>
                      </div>
                      <Stack direction="row" spacing={2}>
                        <Button onClick={() => removeItem(product.id)} variant="outlined">
                          X
                        </Button>
                      </Stack>
                    </div>
                    <hr />
                  </div>
                )
              })
            }
          </div>)
        }
      </Drawer>
    </div>
  )
}

export default App
