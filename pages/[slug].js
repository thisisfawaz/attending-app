import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ParticipantView } from './index';
import { useRouter } from 'next/router';

export default function SlugPage() {
  const [campaignId, setCampaignId] = useState(null);
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
        console.log('Looking for slug:', slug);
        
        // Find campaign by shareable_code
        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('shareable_code', slug.toLowerCase())
          .single();

        console.log('Query result:', data, error);

        if (data) {
          setCampaignId(data.campaign_id);
        } else {
          // Campaign not found
          alert('Campaign not found. Please check the URL.');
          router.push('/');
        }
      } catch (error) {
        console.error('Error finding campaign:', error);
        alert('Error finding campaign. Please try again.');
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

  if (!campaignId) {
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

  return <ParticipantView campaignId={campaignId} />;
}