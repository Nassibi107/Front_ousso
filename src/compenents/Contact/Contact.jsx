import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const colors = {
    primary: '#025984',
    secondary: '#0a8899',
    accent: '#0fb5a0',
    light: '#e7d8c4',
    success: '#01af4c'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div 
        className="min-h-screen relative flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 35%, ${colors.accent} 100%)`
        }}
      >
        {/* Nature Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 2px), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="max-w-2xl mx-auto p-8 relative z-10">
          <div 
            className="text-center p-8 rounded-xl shadow-2xl backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(231, 216, 196, 0.95)'
            }}
          >
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.success }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
            Message envoyé <b>avec succès</b> !
          </h3>
          <p style={{ color: colors.secondary }}>
            Merci de nous avoir contacté. Nous vous répondrons bientôt.
          </p>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 35%, ${colors.accent} 100%)`
      }}
    >
      {/* Nature Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 2px), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Leaves */}
        <div 
          className="absolute w-8 h-8 opacity-20 animate-pulse"
          style={{ 
            top: '10%', 
            left: '15%',
            background: colors.light,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
        />
        <div 
          className="absolute w-6 h-6 opacity-30 animate-pulse"
          style={{ 
            top: '20%', 
            right: '20%',
            background: colors.light,
            borderRadius: '0 100% 0 100%',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-10 h-10 opacity-15 animate-pulse"
          style={{ 
            bottom: '15%', 
            left: '10%',
            background: colors.light,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-7 h-7 opacity-25 animate-pulse"
          style={{ 
            bottom: '30%', 
            right: '15%',
            background: colors.light,
            borderRadius: '50% 0 50% 0',
            animationDelay: '0.5s'
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto p-8 relative z-10">
      <div 
        className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm"
        style={{ 
          borderTop: `4px solid ${colors.accent}`,
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <div className="text-center mb-8">
          <h2 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Entrer en contact
          </h2>
          <p style={{ color: colors.secondary }}>
            Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.primary }}
              >
                Nom Complet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-opacity-100 transition-colors"
                style={{ 
                  '--tw-ring-color': colors.accent,
                  borderColor: 'rgb(229, 231, 235)'
                }}
                onFocus={(e) => e.target.style.borderColor = colors.accent}
                onBlur={(e) => e.target.style.borderColor = 'rgb(229, 231, 235)'}
                placeholder="Entrez votre nom complet"
              />
            </div>
            
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.primary }}
              >
                Adresse e-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none transition-colors"
                onFocus={(e) => e.target.style.borderColor = colors.accent}
                onBlur={(e) => e.target.style.borderColor = 'rgb(229, 231, 235)'}
                placeholder="Entrez votre adresse e-mail"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="subject" 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Sujet *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none transition-colors"
              onFocus={(e) => e.target.style.borderColor = colors.accent}
              onBlur={(e) => e.target.style.borderColor = 'rgb(229, 231, 235)'}
              placeholder="De quoi s'agit-il?"
            />
          </div>

          <div>
            <label 
              htmlFor="message" 
              className="block text-sm font-medium mb-2"
              style={{ color: colors.primary }}
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none transition-colors resize-none"
              onFocus={(e) => e.target.style.borderColor = colors.accent}
              onBlur={(e) => e.target.style.borderColor = 'rgb(229, 231, 235)'}
              placeholder="Dites-nous en plus sur votre demande..."
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-4 px-8 rounded-lg text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: isSubmitting ? colors.secondary : colors.accent,
              transform: isSubmitting ? 'scale(0.98)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = colors.secondary;
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = colors.accent;
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Sending Message...</span>
              </div>
            ) : (
              'Envoyer le message'
            )}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.light }}
              >
                <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: colors.primary }}>Email</h4>
              <p className="text-sm" style={{ color: colors.secondary }}>hello@company.com</p>
            </div>
            
            <div>
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.light }}
              >
                <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: colors.primary }}>Phone</h4>
              <p className="text-sm" style={{ color: colors.secondary }}>+1 (555) 123-4567</p>
            </div>
            
            <div>
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors.light }}
              >
                <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-1" style={{ color: colors.primary }}>Office</h4>
              <p className="text-sm" style={{ color: colors.secondary }}>123 Business St, City</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ContactForm;