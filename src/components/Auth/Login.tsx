import { Form, Input, Button, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface LoginProps {
  email: string;
  password: string;
}
export const Login = () => {
  const [form] = Form.useForm();

  const { signIn } = useAuth();
  const history = useHistory();
  
  async function handleSumit(e: LoginProps) {

    const email = e.email;
    const password = e.password;

    const { error } = await signIn({ email, password });
    if (error) {
      alert('error signing in');
    } else {
      
      history.push('/CampaignsAdmin');
    }
  }

  return (
    <>
      <Row>
        <Col span={8} offset={8}>
          <h1>LOGIN</h1>
          <Form
            form={form}
            preserve={false}
            onFinish={handleSumit}
            layout={'vertical'}
          >
            <Form.Item
              label="Email"
              name="email"
            >
              <Input
                name="email"
                type="email"
                placeholder="Enter Email"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
            >
              <Input.Password
                name="password"
                type="password"
                placeholder="Enter Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item wrapperCol={{}}>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }}>
                LOGIN
              </Button>
            </Form.Item>
          </Form>
          <p>
            Dont have an account? <Link to="./signup">Sign Up</Link>
          </p>
        </Col>
      </Row>
    </>
  );
};