import ArtSection from '@/components/ArtSection';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import GuideSection from '@/components/GuideSection';
import StudioSection from '@/components/StudioSection';
import AccountSection from '@/components/AccountSection';
import CustomCursor from '@/components/CustomCursor';
import ScrollIndicator from '@/components/ScrollIndicator';

export default function HomePage() {
  return (
    <div
      className="snap-container"
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#060606',
        color: '#eaeaea',
      }}
    >
      <CustomCursor />
      <ScrollIndicator />

      <ArtSection id="hero" className="hero-section">
        <HeroSection />
      </ArtSection>

      <ArtSection
        id="catalogo"
        className="catalogo-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg"
        overlayOpacity={0.75}
      >
        <CatalogSection />
      </ArtSection>

      <ArtSection
        id="guida"
        className="guida-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg"
        overlayOpacity={0.78}
      >
        <GuideSection />
      </ArtSection>

      <ArtSection
        id="studio"
        className="studio-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/b/b4/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg"
        overlayOpacity={0.80}
      >
        <StudioSection />
      </ArtSection>

      <ArtSection
        id="account"
        className="account-section"
        backgroundImage="https://upload.wikimedia.org/wikipedia/commons/4/46/Vincent_Willem_van_Gogh_127.jpg"
        overlayOpacity={0.75}
      >
        <AccountSection />
      </ArtSection>
    </div>
  );
}
