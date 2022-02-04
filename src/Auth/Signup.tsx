import { useAuth } from 'contexts/Auth';
import { Form, Input, Button, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';

interface SignupProps {
  email: string;
  password: string;
}
export const Signup = () => {
  const [form] = Form.useForm();

  const { signUp } = useAuth();
  const history = useHistory();

  async function handleSumit(e: SignupProps) {

   
    const email = e.email;
    const password = e.password;

   
    const { error } = await signUp({ email, password });

    if (error) {
      alert('error signing in');
    } else {
   
      alert('Please, confirm Email');
      history.push('/CampaignsAdmin');
    }
  }

  return (
    <>
      <Row>
        <Col span={8} offset={8}>
          <h1>SIGNUP</h1>
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
              SIGNUP
              </Button>
            </Form.Item>
          </Form>
          <p>
            Already have an account? <Link to="./login">Log In</Link>
          </p>
        </Col>
      </Row>
    </>
  );
};