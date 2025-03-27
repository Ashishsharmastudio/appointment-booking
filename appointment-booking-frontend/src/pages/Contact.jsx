import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="mb-4">
      <button
        className="w-full bg-[#31b0d5] text-white p-4 flex justify-between items-center rounded-lg hover:bg-[#2b9ec1] transition-colors"
        onClick={onClick}
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-4 bg-white border border-gray-200 rounded-b-lg">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    interestedIn: '',
    hearAboutUs: '',
    message: ''
  });

  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How can I add Accordion FAQs to my site?",
      answer: "After activating the plugin, you will see the 'Easy Accordion' menu on your WordPress admin panel. Go to Easy Accordion > and click 'Add New' menu and you will find an Accordion Content input field and Shortcode Generator Settings panel."
    },
    {
      question: "I want to show the accordion on my homepage",
      answer: "The generator fields are highly customizable. After input accordion content, customize the accordion and publish. And then will see a generated shortcode in the bottom section. You need to insert it into any page or post editor even Gutenberg editor."
    },
    {
      question: "How can I get support if the plugin is not working?",
      answer: "For including on the template, copy and paste the PHP code into your template file. If you need additional support, please contact our support team."
    }
  ];

  const handleFAQClick = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => handleFAQClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Our mailing address is:</h3>
                <p className="text-gray-600">
                  152A Charlotte Street,<br />
                  Peterborough, ON
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Phone:</h3>
                <p className="text-gray-600">705-742-3221</p>
              </div>
              
              {/* Social Media Links */}
              <div className="pt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                    <FaFacebookF className="w-6 h-6" />
                  </a>
                  <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 transition-colors">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a href="https://instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a href="mailto:your-email@example.com" className="text-red-500 hover:text-red-600 transition-colors">
                    <FaGoogle className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+1 (XXX) XXX - XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interestedIn" className="block text-sm font-medium text-gray-700">I am interested in *</label>
                <select
                  id="interestedIn"
                  name="interestedIn"
                  required
                  value={formData.interestedIn}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Service</option>
                  <option value="smart-home">Smart Home Installation</option>
                  <option value="security">Security Systems</option>
                  <option value="automation">Home Automation</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>

              <div>
                <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700">How did you hear about us?</label>
                <input
                  type="text"
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">How can we help you? *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketing"
                  name="marketing"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="marketing" className="ml-2 block text-sm text-gray-600">
                  By providing your email address, you accept to receive marketing emails from us. You can unsubscribe from these emails at anytime.
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Location</h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2851.3889725466395!2d-78.31931812346055!3d44.30338077107615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d58cce1f76e75d%3A0x1e0227845b9426!2s152A%20Charlotte%20St%2C%20Peterborough%2C%20ON%20K9J%202T8%2C%20Canada!5e0!3m2!1sen!2s!4v1711522419054!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
