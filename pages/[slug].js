import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ParticipantView } from './index';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SlugPage() {
  const [campaignId, setCampaignId] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    async function findCampaign() {
      if (!slug) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('shareable_code', slug.toLowerCase())
          .single();

        if (data) {
          setCampaignId(data.campaign_id);
          setCampaignData(data);
        } else {
          alert('Campaign not found. Please check the URL.');
          router.push('/');
        }
      } catch (error) {
        console.error('Error finding campaign:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      findCampaign();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!campaignId || !campaignData) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h1>Campaign Not Found</h1>
          <p className="subhead">The campaign you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '10px 20px',
              background: '#E2171D',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{campaignData.name} - Banner Generator</title>
        <meta name="description" content={`Create your personalized banner for ${campaignData.name}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://events.4ther.com/${slug}`} />
        <meta property="og:title" content={`${campaignData.name} - Banner Generator`} />
        <meta property="og:description" content={`Create your personalized banner for ${campaignData.name}`} />
        <meta property="og:image" content={campaignData.banner_url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${campaignData.name} - Banner Generator`} />
        <meta name="twitter:description" content={`Create your personalized banner for ${campaignData.name}`} />
        <meta name="twitter:image" content={campaignData.banner_url} />
      </Head>
      <ParticipantView campaignId={campaignId} />
    </>
  );
}