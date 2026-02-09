import { Component, createSignal } from 'solid-js';
import { Form } from '../../../components/feedback/Form';
import { FormField } from '../../../components/feedback/FormField';
import { FieldError } from '../../../components/feedback/FieldError';
import { TextField } from '../../../components/inputs/TextField';
import { Checkbox } from '../../../components/inputs/Checkbox';
import { RadioGroup } from '../../../components/inputs/RadioGroup';
import { Combobox } from '../../../components/inputs/Combobox';
import { Slider } from '../../../components/inputs/Slider';
import { Button } from '../../../components/inputs/Button';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { useForm, FormErrors } from '../../../utils/useForm';
import {
  BsMoon,
  BsSun,
  BsCircleHalf,
  BsStar,
  BsStarFill,
  BsHeart,
  BsHeartFill,
  BsCreditCard,
  BsGift,
  BsTrophy,
} from 'solid-icons/bs';

interface FormValues {
  email: string;
  password: string;
  username: string;
  bio: string;
  age: number;
  acceptTerms: boolean;
  notifications: boolean;
  theme: string;
  plan: string;
}

const FormDemo: Component = () => {
  const [submitResult, setSubmitResult] = createSignal<string>('');

  // Standalone component states
  const [standaloneText, setStandaloneText] = createSignal('invalid@');
  const [standaloneCheck, setStandaloneCheck] = createSignal(false);
  const [standaloneIconCheck, setStandaloneIconCheck] = createSignal(false);
  const [standaloneRadio, setStandaloneRadio] = createSignal('');
  const [standaloneIconRadio, setStandaloneIconRadio] = createSignal('');
  const [standaloneCombo, setStandaloneCombo] = createSignal('');
  const [standaloneIconCombo, setStandaloneIconCombo] = createSignal('');
  const [standaloneSlider, setStandaloneSlider] = createSignal(10);

  const validate = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!values.username) {
      errors.username = 'Username is required';
    } else if (values.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }

    if (values.bio && values.bio.length > 200) {
      errors.bio = 'Bio must be 200 characters or less';
    }

    if (values.age < 18) {
      errors.age = 'You must be at least 18 years old';
    }

    if (!values.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }

    if (!values.notifications) {
      errors.notifications = 'You must enable notifications';
    }

    if (!values.theme) {
      errors.theme = 'Please select a theme';
    }

    if (!values.plan) {
      errors.plan = 'Please select a plan';
    }

    return errors;
  };

  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
      username: '',
      bio: '',
      age: 25,
      acceptTerms: false,
      notifications: false,
      theme: '',
      plan: '',
    },
    validate,
    onSubmit: async (values) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitResult('Form submitted successfully! Check console for values.');
      console.log('Form values:', values);
    },
  });

  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing-lg)' }}>
      <div>
        <h1>Form Management</h1>
        <p style={{ color: 'var(--g-text-secondary)' }}>
          Complete form validation with error handling, field-level validation on blur after first
          submit, and loading states.
        </p>
      </div>

      <Card>
        <CardHeader title="User Registration Form" />

        <Form onSubmit={form.handleSubmit}>
          <FormField label="Email" error={form.errors.email} required>
            <TextField
              type="email"
              placeholder="Enter your email"
              value={form.values.email}
              onChange={form.handleChange('email')}
              onBlur={form.handleBlur('email')}
              invalid={!!form.errors.email}
            />
          </FormField>

          <FormField label="Password" error={form.errors.password} required>
            <TextField
              type="password"
              placeholder="Enter your password"
              value={form.values.password}
              onChange={form.handleChange('password')}
              onBlur={form.handleBlur('password')}
              invalid={!!form.errors.password}
            />
          </FormField>

          <FormField label="Username" error={form.errors.username} required>
            <TextField
              placeholder="Choose a username"
              value={form.values.username}
              onChange={form.handleChange('username')}
              onBlur={form.handleBlur('username')}
              invalid={!!form.errors.username}
              maxLength={20}
              showCount
            />
          </FormField>

          <FormField label="Bio" error={form.errors.bio}>
            <TextField
              placeholder="Tell us about yourself"
              value={form.values.bio}
              onChange={form.handleChange('bio')}
              onBlur={form.handleBlur('bio')}
              invalid={!!form.errors.bio}
              multiline
              maxLength={200}
              showCount
            />
          </FormField>

          <FormField label="Age" error={form.errors.age} required>
            <Slider
              value={form.values.age}
              onChange={(value) => form.handleChange('age')(value as number)}
              onBlur={form.handleBlur('age')}
              min={0}
              max={100}
              marks={[
                { value: 18, label: '18' },
                { value: 30, label: '30' },
                { value: 50, label: '50' },
                { value: 70, label: '70' },
              ]}
              showTooltip
              invalid={!!form.errors.age}
            />
          </FormField>

          <FormField label="Theme" error={form.errors.theme} required>
            <RadioGroup
              name="theme"
              value={form.values.theme}
              onChange={form.handleChange('theme')}
              onBlur={form.handleBlur('theme')}
              invalid={!!form.errors.theme}
              options={[
                { value: 'dark', label: 'Dark Mode', iconUnchecked: BsMoon, iconChecked: BsMoon },
                { value: 'light', label: 'Light Mode', iconUnchecked: BsSun, iconChecked: BsSun },
                { value: 'auto', label: 'Auto', iconUnchecked: BsCircleHalf, iconChecked: BsCircleHalf },
              ]}
              orientation="horizontal"
            />
          </FormField>

          <FormField label="Plan" error={form.errors.plan} required>
            <Combobox
              value={form.values.plan}
              onChange={(value) => form.handleChange('plan')(value as string)}
              onBlur={form.handleBlur('plan')}
              invalid={!!form.errors.plan}
              placeholder="Select a plan"
              options={[
                { value: 'free', label: 'Free', icon: BsGift },
                { value: 'pro', label: 'Pro', icon: BsCreditCard },
                { value: 'enterprise', label: 'Enterprise', icon: BsTrophy },
              ]}
            />
          </FormField>

          <FormField error={form.errors.acceptTerms}>
            <Checkbox
              checked={form.values.acceptTerms}
              onChange={(e) => form.handleChange('acceptTerms')(e.currentTarget.checked)}
              onBlur={form.handleBlur('acceptTerms')}
              invalid={!!form.errors.acceptTerms}
              label="I accept the terms and conditions"
            />
          </FormField>

          <FormField error={form.errors.notifications}>
            <Checkbox
              checked={form.values.notifications}
              onChange={(e) => form.handleChange('notifications')(e.currentTarget.checked)}
              onBlur={form.handleBlur('notifications')}
              invalid={!!form.errors.notifications}
              iconUnchecked={BsHeart}
              iconChecked={BsHeartFill}
              label="Enable notifications"
            />
          </FormField>

          <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'margin-top': 'var(--g-spacing)' }}>
            <Button type="submit" variant="primary" loading={form.isSubmitting}>
              Submit
            </Button>
            <Button type="button" variant="secondary" onClick={form.reset}>
              Reset
            </Button>
          </div>

          {submitResult() && (
            <div
              style={{
                padding: 'var(--g-spacing)',
                'background-color': 'var(--color-success)',
                'border-radius': 'var(--g-radius)',
                color: 'var(--g-text-primary)',
              }}
            >
              {submitResult()}
            </div>
          )}
        </Form>
      </Card>

      <Card>
        <CardHeader title="Standalone Components (No Form Wrapper)" />

        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing-lg)' }}>
          <div>
            <h3>TextField with Error</h3>
            <TextField
              label="Email"
              placeholder="Enter email"
              value={standaloneText()}
              onChange={setStandaloneText}
              invalid
            />
            <FieldError error="Invalid email format" />
          </div>

          <div>
            <h3>Checkbox with Error</h3>
            <Checkbox
              label="Accept terms"
              checked={standaloneCheck()}
              onChange={(e) => setStandaloneCheck(e.currentTarget.checked)}
              invalid
            />
            <FieldError error="You must accept the terms" />
          </div>

          <div>
            <h3>RadioGroup with Error</h3>
            <RadioGroup
              name="standalone-radio"
              value={standaloneRadio()}
              onChange={setStandaloneRadio}
              options={[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
              ]}
              invalid
            />
            <FieldError error="Please select an option" />
          </div>

          <div>
            <h3>Combobox with Error</h3>
            <Combobox
              placeholder="Select option"
              value={standaloneCombo()}
              onChange={(val) => setStandaloneCombo(val as string)}
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
              ]}
              invalid
            />
            <FieldError error="Please select a value" />
          </div>

          <div>
            <h3>Slider with Error</h3>
            <Slider
              value={standaloneSlider()}
              onChange={(val) => setStandaloneSlider(val as number)}
              min={0}
              max={100}
              invalid
            />
            <FieldError error="Value too low (minimum 18)" />
          </div>

          <div>
            <h3>Checkbox with Icons and Error</h3>
            <Checkbox
              label="Favorite"
              checked={standaloneIconCheck()}
              onChange={(e) => setStandaloneIconCheck(e.currentTarget.checked)}
              iconUnchecked={BsStar}
              iconChecked={BsStarFill}
              invalid
            />
            <FieldError error="Please mark as favorite" />
          </div>

          <div>
            <h3>RadioGroup with Icons and Error</h3>
            <RadioGroup
              name="standalone-icon-radio"
              value={standaloneIconRadio()}
              onChange={setStandaloneIconRadio}
              options={[
                { value: 'dark', label: 'Dark', iconUnchecked: BsMoon, iconChecked: BsMoon },
                { value: 'light', label: 'Light', iconUnchecked: BsSun, iconChecked: BsSun },
              ]}
              orientation="horizontal"
              invalid
            />
            <FieldError error="Please select a theme" />
          </div>

          <div>
            <h3>Combobox with Icons and Error</h3>
            <Combobox
              placeholder="Select plan"
              value={standaloneIconCombo()}
              onChange={(val) => setStandaloneIconCombo(val as string)}
              options={[
                { value: 'free', label: 'Free', icon: BsGift },
                { value: 'pro', label: 'Pro', icon: BsCreditCard },
              ]}
              invalid
            />
            <FieldError error="Please select a plan" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormDemo;
