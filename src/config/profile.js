// Single source of truth for personal profile data used across the site
// (Navbar, About Me section, footer, BlogPost author block).

export const profile = {
  name: 'Brenon Araujo',
  shortName: 'Brenon',
  initials: 'BA',
  photo: '/images/profile.jpg', // place file under public/images/profile.jpg
  roles: ['backendEngineer', 'contentCreator', 'homeCloudBuilder'],
}

export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/brenonaraujo',
    showInNav: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/brenonaraujo',
    showInNav: true,
  },
  {
    id: 'devdojo',
    label: 'DevDojo',
    url: null, // referral link pending — entry hidden while null
    showInNav: false,
  },
]

export const visibleSocialLinks = socialLinks.filter((link) => link.url)
export const navSocialLinks = socialLinks.filter((link) => link.url && link.showInNav)
