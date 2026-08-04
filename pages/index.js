import { useState, useRef, useEffect } from 'react';
import ImageUploader from '../components/ImageUploader';
import { supabase } from '../lib/supabase';

// SVG Icons
const Icons = {
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Upload: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  Drag: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="12" r="1"/>
      <circle cx="9" cy="5" r="1"/>
      <circle cx="9" cy="19" r="1"/>
    </svg>
  ),
  Copy: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Download: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Edit: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  Check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Layout: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  ),
  Share: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Image: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Text: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7"/>
      <line x1="9" y1="20" x2="15" y2="20"/>
      <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Trash: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  List: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  )
};

// Layout Container Style with expanded max-width (700px)
const containerStyle = {
  maxWidth: '700px',
  width: '100%',
  margin: '0 auto',
  padding: '0 20px',
  boxSizing: 'border-box'
};

const cardStyle = {
  width: '100%'
};

function Home({ isAdmin = false, campaignData = null, setCampaignData = null }) {
  const [step, setStep] = useState('setup');
  const [campaignName, setCampaignName] = useState(campaignData?.name || '');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(campaignData?.banner_url || null);
  const [campaignId, setCampaignId] = useState(campaignData?.campaign_id || null);
  const [loading, setLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAllCampaigns, setShowAllCampaigns] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [shareableSlug, setShareableSlug] = useState(campaignData?.shareable_code || '');
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);
  
  const [photoCircle, setPhotoCircle] = useState(
    campaignData?.photo_circle || { x: 0, y: 0, size: 150 }
  );
  const [nameBox, setNameBox] = useState(
    campaignData?.name_box || { x: 0, y: 0, fontSize: 80 }
  );
  const [bannerDimensions, setBannerDimensions] = useState(
    campaignData?.dimensions || { width: 0, height: 0 }
  );
  
  const [isDragging, setIsDragging] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, startSize: 0 });
  
  const containerRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current || !bannerDimensions.width) return;

    const updateScale = () => {
      if (containerRef.current && bannerDimensions.width) {
        setPreviewScale(containerRef.current.offsetWidth / bannerDimensions.width);
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [step, bannerDimensions.width, bannerPreview]);

  const THEME_COLOR = '#E2171D';

  useEffect(() => {
    if (showAnalytics && campaignId) {
      loadParticipants();
    }
  }, [showAnalytics, campaignId]);

  useEffect(() => {
    if (showAllCampaigns) {
      loadAllCampaigns();
    }
  }, [showAllCampaigns]);

  const loadParticipants = async () => {
    setLoadingParticipants(true);
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error loading participants:', error);
    } finally {
      setLoadingParticipants(false);
    }
  };

  const loadAllCampaigns = async () => {
    setLoadingCampaigns(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const { data: allParticipants, error: participantsError } = await supabase
        .from('participants')
        .select('campaign_id');

      if (participantsError) throw participantsError;

      const countByCampaign = {};
      (allParticipants || []).forEach((p) => {
        countByCampaign[p.campaign_id] = (countByCampaign[p.campaign_id] || 0) + 1;
      });

      const campaignsWithCounts = (data || []).map((c) => ({
        ...c,
        participant_count: countByCampaign[c.campaign_id] || 0
      }));

      setAllCampaigns(campaignsWithCounts);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  const deleteCampaign = async (campaignIdToDelete) => {
    if (!confirm('Are you sure you want to delete this campaign and all its participants?')) return;

    try {
      const { error: participantsError } = await supabase
        .from('participants')
        .delete()
        .eq('campaign_id', campaignIdToDelete);

      if (participantsError) throw participantsError;

      const { error: campaignError } = await supabase
        .from('campaigns')
        .delete()
        .eq('campaign_id', campaignIdToDelete);

      if (campaignError) throw campaignError;

      alert('Campaign deleted successfully!');
      loadAllCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert(`Error deleting campaign: ${error.message || 'Please try again.'}`);
    }
  };

  const generateShareableSlug = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let slug = '';
    for (let i = 0; i < 8; i++) {
      slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return slug;
  };

  const createCampaign = async (e) => {
    e.preventDefault();
    if (!campaignName.trim()) {
      alert('Please enter a campaign name');
      return;
    }
    if (!bannerImage && !bannerPreview) {
      alert('Please upload a banner image');
      return;
    }

    setLoading(true);

    try {
      let publicUrl = bannerPreview;

      if (bannerImage) {
        const fileExt = bannerImage.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `campaigns/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('banners')
          .upload(filePath, bannerImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: newUrl } } = supabase.storage
          .from('banners')
          .getPublicUrl(filePath);
        publicUrl = newUrl;
      }

      const img = new Image();
      img.src = publicUrl;
      
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      const width = img.width || 800;
      const height = img.height || 400;

      // Only compute fresh default positions when there's no existing
      // layout to keep: a brand-new campaign, or a newly uploaded banner
      // image (which may have different dimensions). Otherwise, keep
      // whatever position/size was already set so editing continues
      // from there instead of resetting.
      const isNewBannerImage = !!bannerImage;
      const hasExistingLayout = campaignId && photoCircle && nameBox && bannerDimensions?.width;

      let photoCircleData, nameBoxData;

      if (hasExistingLayout && !isNewBannerImage) {
        photoCircleData = photoCircle;
        nameBoxData = nameBox;
      } else {
        photoCircleData = {
          x: (width - 150) / 2,
          y: height * 0.3,
          size: 150
        };

        nameBoxData = {
          x: width / 2,
          y: height * 0.75,
          fontSize: Math.max(80, height * 0.1)
        };
      }

      const newCampaignId = campaignId || Date.now().toString(36);
      const newShareableSlug = shareableSlug || generateShareableSlug();
      
      const campaignPayload = {
        campaign_id: newCampaignId,
        name: campaignName,
        banner_url: publicUrl,
        photo_circle: photoCircleData,
        name_box: nameBoxData,
        dimensions: { width, height },
        shareable_code: newShareableSlug.toLowerCase()
      };

      let error;
      if (campaignId) {
        const { error: updateError } = await supabase
          .from('campaigns')
          .update(campaignPayload)
          .eq('campaign_id', campaignId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('campaigns')
          .insert([campaignPayload]);
        error = insertError;
      }

      if (error) throw error;

      setCampaignId(newCampaignId);
      setShareableSlug(newShareableSlug.toLowerCase());
      setBannerDimensions({ width, height });
      setPhotoCircle(photoCircleData);
      setNameBox(nameBoxData);
      setStep('preview');
      
      if (showAllCampaigns) {
        loadAllCampaigns();
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert(`Error saving campaign: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBannerUpload = (file) => {
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e, type) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = bannerDimensions.width / rect.width;
    const scaleY = bannerDimensions.height / rect.height;
    
    setIsDragging(type);
    setDragStart({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    });
  };

  const handleResizeStart = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = bannerDimensions.width / rect.width;
    const scaleY = bannerDimensions.height / rect.height;
    
    setIsResizing(type);
    setResizeStart({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      startSize: type === 'photo' ? photoCircle.size : nameBox.fontSize
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging && !isResizing) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = bannerDimensions.width / rect.width;
    const scaleY = bannerDimensions.height / rect.height;
    
    const currentX = (e.clientX - rect.left) * scaleX;
    const currentY = (e.clientY - rect.top) * scaleY;

    if (isDragging === 'photo') {
      const dx = currentX - dragStart.x;
      const dy = currentY - dragStart.y;
      setPhotoCircle(prev => ({
        ...prev,
        x: Math.max(0, Math.min(bannerDimensions.width - prev.size, prev.x + dx)),
        y: Math.max(0, Math.min(bannerDimensions.height - prev.size, prev.y + dy))
      }));
      setDragStart({ x: currentX, y: currentY });
    } else if (isDragging === 'name') {
      const dx = currentX - dragStart.x;
      const dy = currentY - dragStart.y;
      setNameBox(prev => ({
        ...prev,
        x: Math.max(0, Math.min(bannerDimensions.width, prev.x + dx)),
        y: Math.max(0, Math.min(bannerDimensions.height, prev.y + dy))
      }));
      setDragStart({ x: currentX, y: currentY });
    } else if (isResizing === 'photo') {
      const delta = Math.max(currentX - resizeStart.x, currentY - resizeStart.y);
      const newSize = Math.max(10, Math.min(bannerDimensions.width * 0.6, resizeStart.startSize + delta));
      setPhotoCircle(prev => ({ ...prev, size: newSize }));
    } else if (isResizing === 'name') {
      const delta = Math.max(currentX - resizeStart.x, currentY - resizeStart.y);
      const newSize = Math.max(10, Math.min(bannerDimensions.width * 0.3, resizeStart.startSize + delta));
      setNameBox(prev => ({ ...prev, fontSize: newSize }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setIsResizing(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const generateShareableLink = async () => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          photo_circle: photoCircle,
          name_box: nameBox,
          dimensions: bannerDimensions
        })
        .eq('campaign_id', campaignId);

      if (error) throw error;

      setStep('share');
    } catch (error) {
      console.error('Error saving campaign layout:', error);
      alert(`Error saving layout: ${error.message || 'Please try again.'}`);
    }
  };

  if (showAllCampaigns) {
    return (
      <div className="container" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>All Campaigns</h1>
            <button
              onClick={() => setShowAllCampaigns(false)}
              style={{
                padding: '8px 16px',
                background: THEME_COLOR,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              ← Back to Creator
            </button>
          </div>
          <p className="subhead">Manage all your campaigns</p>

          <button
            onClick={loadAllCampaigns}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: 'transparent',
              border: `1px solid ${THEME_COLOR}`,
              borderRadius: '8px',
              cursor: 'pointer',
              color: THEME_COLOR,
              marginBottom: '20px'
            }}
          >
            <Icons.Refresh /> Refresh
          </button>

          {loadingCampaigns ? (
            <p style={{ textAlign: 'center', color: '#6b7f93' }}>Loading campaigns...</p>
          ) : allCampaigns.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7f93' }}>No campaigns created yet</p>
          ) : (
            <div style={{ maxHeight: '600px', overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #dce5ef' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#4a617a' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#4a617a' }}>Slug</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#4a617a' }}>Participants</th>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: '#4a617a' }}>Created</th>
                    <th style={{ textAlign: 'center', padding: '12px 8px', color: '#4a617a' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allCampaigns.map((campaign) => (
                    <tr key={campaign.campaign_id} style={{ borderBottom: '1px solid #ecf2f9' }}>
                      <td style={{ padding: '12px 8px', color: '#0b1f33', fontWeight: '500' }}>
                        {campaign.name}
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <code style={{
                          background: '#f0f5ff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          color: THEME_COLOR
                        }}>
                          {campaign.shareable_code}
                        </code>
                      </td>
                      <td style={{ padding: '12px 8px', color: '#0b1f33' }}>
                        {campaign.participant_count || 0}
                      </td>
                      <td style={{ padding: '12px 8px', color: '#6b7f93', fontSize: '0.8rem' }}>
                        {new Date(campaign.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => {
                              if (typeof setCampaignData === 'function') {
                                setCampaignData(campaign);
                              }
                              setCampaignName(campaign.name);
                              setCampaignId(campaign.campaign_id);
                              setBannerPreview(campaign.banner_url);
                              setShareableSlug(campaign.shareable_code);
                              setPhotoCircle(campaign.photo_circle);
                              setNameBox(campaign.name_box);
                              setBannerDimensions(campaign.dimensions);
                              setShowAllCampaigns(false);
                              setStep('setup');
                            }}
                            style={{
                              padding: '6px 12px',
                              background: THEME_COLOR,
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Icons.Edit /> Edit
                          </button>
                          <button
                            onClick={() => deleteCampaign(campaign.campaign_id)}
                            style={{
                              padding: '6px 12px',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Icons.Trash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step === 'setup') {
    return (
      <div className="container" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1 style={{ margin: 0 }}>{campaignId ? 'Edit Campaign' : 'Campaign Creator'}</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowAllCampaigns(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: 'transparent',
                  color: THEME_COLOR,
                  border: `1px solid ${THEME_COLOR}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
              >
                <Icons.List /> All Campaigns
              </button>
              {campaignId && (
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: showAnalytics ? THEME_COLOR : 'transparent',
                    color: showAnalytics ? 'white' : THEME_COLOR,
                    border: `1px solid ${THEME_COLOR}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icons.BarChart /> {showAnalytics ? 'Hide' : 'Show'} Analytics
                </button>
              )}
            </div>
          </div>
          <p className="subhead">
            {campaignId ? 'Edit your campaign settings' : 'Set up your banner campaign'}
          </p>

          {showAnalytics && campaignId && (
            <div style={{
              background: '#f8fbfe',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid #eaf0f6',
              width: '100%'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Icons.Users />
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#0b1f33' }}>
                  Participants ({participants.length})
                </h3>
                <button
                  onClick={loadParticipants}
                  style={{
                    marginLeft: 'auto',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#4a617a',
                    fontSize: '0.85rem'
                  }}
                >
                  <Icons.Refresh /> Refresh
                </button>
              </div>

              {loadingParticipants ? (
                <p style={{ textAlign: 'center', color: '#6b7f93' }}>Loading...</p>
              ) : participants.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#6b7f93' }}>No participants yet</p>
              ) : (
                <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #dce5ef' }}>
                        <th style={{ textAlign: 'left', padding: '8px', color: '#4a617a' }}>Name</th>
                        <th style={{ textAlign: 'left', padding: '8px', color: '#4a617a' }}>Font Size</th>
                        <th style={{ textAlign: 'left', padding: '8px', color: '#4a617a' }}>Edit Code</th>
                        <th style={{ textAlign: 'left', padding: '8px', color: '#4a617a' }}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((p, index) => (
                        <tr key={p.id || index} style={{ borderBottom: '1px solid #ecf2f9' }}>
                          <td style={{ padding: '8px', color: '#0b1f33' }}>{p.name}</td>
                          <td style={{ padding: '8px', color: '#0b1f33' }}>{p.font_size}px</td>
                          <td style={{ padding: '8px' }}>
                            <code style={{
                              background: '#f0f5ff',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              color: THEME_COLOR
                            }}>
                              {p.edit_code}
                            </code>
                          </td>
                          <td style={{ padding: '8px', color: '#6b7f93', fontSize: '0.8rem' }}>
                            {new Date(p.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          <form onSubmit={createCampaign} style={{ width: '100%' }}>
            <div className="form-group" style={{ width: '100%' }}>
              <label htmlFor="campaignName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Campaign Name</label>
              <input
                type="text"
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Tech Conference 2026"
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
                required
              />
            </div>

            <div className="form-group" style={{ width: '100%' }}>
              <label htmlFor="shareableSlug" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Shareable Slug</label>
              <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <div style={{ flex: '1', display: 'flex', alignItems: 'center', background: '#fafcff', border: '2px solid #dce5ef', borderRadius: '12px', padding: '0 12px' }}>
                  <span style={{ color: THEME_COLOR, fontSize: '0.85rem', fontWeight: '600', marginRight: '4px' }}>events.4ther.com/</span>
                  <input
                    type="text"
                    id="shareableSlug"
                    value={shareableSlug}
                    onChange={(e) => setShareableSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="your-event-name"
                    style={{
                      flex: '1',
                      padding: '12px 0',
                      border: 'none',
                      fontSize: '1rem',
                      background: 'transparent',
                      color: '#0b1f33',
                      outline: 'none',
                      textTransform: 'lowercase',
                      width: '100%'
                    }}
                    maxLength="30"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShareableSlug(generateShareableSlug())}
                  style={{
                    padding: '12px 20px',
                    background: THEME_COLOR,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Random
                </button>
              </div>
              <small style={{ display: 'block', marginTop: '6px', color: '#6b7f93' }}>
                This will be the URL: <strong><span style={{ color: THEME_COLOR }}>events.4ther.com/</span>{shareableSlug || 'your-slug'}</strong>
                <br />Allowed: lowercase letters, numbers, and hyphens (-)
              </small>
            </div>

            <div className="form-group" style={{ width: '100%' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Upload Banner Image</label>
              <ImageUploader onImageUpload={handleBannerUpload} />
              {bannerPreview && (
                <div className="banner-preview" style={{ width: '100%', marginTop: '12px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#4a617a', marginBottom: '8px' }}>Preview:</p>
                  <img src={bannerPreview} alt="Banner preview" style={{ width: '100%', borderRadius: '12px', maxHeight: '350px', objectFit: 'contain' }} />
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ background: THEME_COLOR, width: '100%', padding: '12px 24px', border: 'none', borderRadius: '6px', color: '#ffffff', fontSize: '16px', cursor: 'pointer', fontWeight: '600' }} disabled={loading}>
              {loading ? 'Saving...' : campaignId ? 'Update Campaign →' : 'Next: Position Elements →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    return (
      <div className="container" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', color: THEME_COLOR }}>
              <Icons.Edit />
            </div>
          </div>
          <h1>Position Elements</h1>
          <p className="subhead">Drag the circle and text box to where you want them on the banner</p>
          
          <div style={{ marginBottom: '16px', textAlign: 'center' }}>
            <p style={{ color: '#4a617a', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Icons.Drag /> Drag to reposition • Drag corners to resize • Use number inputs for exact sizes
            </p>
          </div>
          
          <div 
            ref={containerRef}
            style={{ 
              position: 'relative', 
              display: 'block',
              width: '100%',
              maxWidth: '100%',
              border: '2px solid #dce5ef',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'default',
              background: '#f8fbfe'
            }}
          >
            <img 
              src={bannerPreview} 
              alt="Banner" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block',
                pointerEvents: 'none'
              }} 
            />
            
            <div
              style={{
                position: 'absolute',
                left: `${(photoCircle.x / bannerDimensions.width) * 100}%`,
                top: `${(photoCircle.y / bannerDimensions.height) * 100}%`,
                width: `${(photoCircle.size / bannerDimensions.width) * 100}%`,
                height: `${(photoCircle.size / bannerDimensions.height) * 100}%`,
                cursor: 'move',
                border: `3px dashed ${THEME_COLOR}`,
                borderRadius: '50%',
                background: 'rgba(226, 23, 29, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                pointerEvents: 'all'
              }}
              onMouseDown={(e) => handleMouseDown(e, 'photo')}
            >
              <div style={{ color: THEME_COLOR, fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
                <Icons.Image />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  right: '-6px',
                  width: '16px',
                  height: '16px',
                  background: THEME_COLOR,
                  borderRadius: '50%',
                  cursor: 'nwse-resize',
                  pointerEvents: 'all',
                  border: '2px solid white'
                }}
                onMouseDown={(e) => handleResizeStart(e, 'photo')}
              />
            </div>
            
            <div
              style={{
                position: 'absolute',
                left: `${(nameBox.x / bannerDimensions.width) * 100}%`,
                top: `${(nameBox.y / bannerDimensions.height) * 100}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'move',
                border: `3px dashed ${THEME_COLOR}`,
                borderRadius: '8px',
                padding: '8px 16px',
                background: 'rgba(226, 23, 29, 0.06)',
                userSelect: 'none',
                pointerEvents: 'all',
                whiteSpace: 'nowrap',
                minWidth: '60px',
                minHeight: '40px'
              }}
              onMouseDown={(e) => handleMouseDown(e, 'name')}
            >
              <span 
                style={{
                  fontSize: nameBox.fontSize * previewScale,
                  color: '#1a1a1a',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                  display: 'block',
                  textShadow: '0 1px 2px rgba(255,255,255,0.5)'
                }}
              >
                Your Name Here
              </span>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  right: '-6px',
                  width: '16px',
                  height: '16px',
                  background: THEME_COLOR,
                  borderRadius: '50%',
                  cursor: 'nwse-resize',
                  pointerEvents: 'all',
                  border: '2px solid white'
                }}
                onMouseDown={(e) => handleResizeStart(e, 'name')}
              />
            </div>
          </div>

          <div style={{ 
            marginTop: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            padding: '16px',
            background: '#f8fbfe',
            borderRadius: '12px',
            border: '1px solid #eaf0f6',
            width: '100%'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#4a617a', marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.Image /> Photo Size (px)
                </span>
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                <input
                  type="number"
                  value={Math.round(photoCircle.size)}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 10 && val <= bannerDimensions.width * 0.6) {
                      setPhotoCircle(prev => ({ ...prev, size: val }));
                    }
                  }}
                  style={{
                    flex: '1',
                    padding: '8px 12px',
                    border: '2px solid #dce5ef',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    width: '100%'
                  }}
                  min="10"
                  max={Math.round(bannerDimensions.width * 0.6)}
                  step="1"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (photoCircle.size > 10) {
                      setPhotoCircle(prev => ({ ...prev, size: prev.size - 5 }));
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    background: '#eef3fa',
                    border: '2px solid #dce5ef',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (photoCircle.size < bannerDimensions.width * 0.6) {
                      setPhotoCircle(prev => ({ ...prev, size: prev.size + 5 }));
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    background: '#eef3fa',
                    border: '2px solid #dce5ef',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7f93', marginTop: '4px' }}>
                Min: 10px • Max: {Math.round(bannerDimensions.width * 0.6)}px
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#4a617a', marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icons.Text /> Name Font Size (px)
                </span>
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                <input
                  type="number"
                  value={Math.round(nameBox.fontSize)}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 10 && val <= bannerDimensions.width * 0.3) {
                      setNameBox(prev => ({ ...prev, fontSize: val }));
                    }
                  }}
                  style={{
                    flex: '1',
                    padding: '8px 12px',
                    border: '2px solid #dce5ef',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    width: '100%'
                  }}
                  min="10"
                  max={Math.round(bannerDimensions.width * 0.3)}
                  step="1"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (nameBox.fontSize > 10) {
                      setNameBox(prev => ({ ...prev, fontSize: prev.fontSize - 5 }));
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    background: '#eef3fa',
                    border: '2px solid #dce5ef',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (nameBox.fontSize < bannerDimensions.width * 0.3) {
                      setNameBox(prev => ({ ...prev, fontSize: prev.fontSize + 5 }));
                    }
                  }}
                  style={{
                    padding: '8px 12px',
                    background: '#eef3fa',
                    border: '2px solid #dce5ef',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7f93', marginTop: '4px' }}>
                Min: 10px • Max: {Math.round(bannerDimensions.width * 0.3)}px
              </div>
            </div>
          </div>

          <div style={{ 
            marginTop: '12px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '8px',
            padding: '16px',
            background: '#f8fbfe',
            borderRadius: '12px',
            border: '1px solid #eaf0f6',
            width: '100%'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#4a617a' }}>Photo X</label>
              <input
                type="number"
                value={Math.round(photoCircle.x)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 0 && val <= bannerDimensions.width - photoCircle.size) {
                    setPhotoCircle(prev => ({ ...prev, x: val }));
                  }
                }}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '2px solid #dce5ef',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#4a617a' }}>Photo Y</label>
              <input
                type="number"
                value={Math.round(photoCircle.y)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 0 && val <= bannerDimensions.height - photoCircle.size) {
                    setPhotoCircle(prev => ({ ...prev, y: val }));
                  }
                }}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '2px solid #dce5ef',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#4a617a' }}>Name X</label>
              <input
                type="number"
                value={Math.round(nameBox.x)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 0 && val <= bannerDimensions.width) {
                    setNameBox(prev => ({ ...prev, x: val }));
                  }
                }}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '2px solid #dce5ef',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#4a617a' }}>Name Y</label>
              <input
                type="number"
                value={Math.round(nameBox.y)}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 0 && val <= bannerDimensions.height) {
                    setNameBox(prev => ({ ...prev, y: val }));
                  }
                }}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '2px solid #dce5ef',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', width: '100%' }}>
            <button 
              type="button"
              onClick={() => setStep('setup')} 
              className="btn btn-secondary"
              style={{ flex: '1', padding: '12px 24px', border: 'none', borderRadius: '6px', background: '#e0e0e0', color: '#333333', cursor: 'pointer', fontWeight: '600' }}
            >
              ← Back
            </button>
            <button 
              type="button"
              onClick={generateShareableLink} 
              className="btn btn-primary"
              style={{ flex: '2', background: THEME_COLOR, padding: '12px 24px', border: 'none', borderRadius: '6px', color: '#ffffff', cursor: 'pointer', fontWeight: '600' }}
            >
              Generate Shareable Link →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'share') {
    const shareableLink = `${window.location.origin}/${shareableSlug}`;
    
    return (
      <div className="container" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', color: THEME_COLOR }}>
              <Icons.Check />
            </div>
          </div>
          <h1>Campaign Ready!</h1>
          <p className="subhead">Share this link with participants</p>
          
          <div style={{ 
            background: '#f8fbfe', 
            padding: '20px', 
            borderRadius: '12px',
            marginBottom: '20px',
            border: '2px solid #dce5ef',
            width: '100%'
          }}>
            <p style={{ fontSize: '0.85rem', color: '#4a617a', marginBottom: '8px' }}>
              Your shareable link:
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              alignItems: 'center',
              width: '100%'
            }}>
              <input 
                type="text" 
                value={shareableLink} 
                readOnly
                style={{
                  flex: '1',
                  padding: '10px 12px',
                  border: '2px solid #dce5ef',
                  borderRadius: '8px',
                  background: 'white',
                  fontSize: '1rem',
                  color: THEME_COLOR,
                  width: '100%'
                }}
              />
              <button 
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(shareableLink);
                  alert('Link copied to clipboard!');
                }}
                style={{
                  padding: '10px 16px',
                  background: THEME_COLOR,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icons.Copy /> Copy Link
              </button>
            </div>
          </div>
          
          <div style={{ 
            background: '#fff5f5', 
            padding: '16px', 
            borderRadius: '12px',
            marginBottom: '20px',
            borderLeft: `0px`,
            width: '100%'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#4a617a' }}>
              <strong>How it works:</strong> Share the link with participants. They'll visit <strong>events.4ther.com/{shareableSlug}</strong> to upload their photo and get a personalized banner.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <button 
              type="button"
              onClick={() => window.open(shareableLink, '_blank')} 
              className="btn btn-primary"
              style={{ flex: '1', background: THEME_COLOR, padding: '12px 24px', border: 'none', borderRadius: '6px', color: '#ffffff', cursor: 'pointer', fontWeight: '600' }}
            >
              Open Participant Page
            </button>
            <button 
              type="button"
              onClick={() => setStep('setup')} 
              className="btn btn-secondary"
              style={{ flex: '1', padding: '12px 24px', border: 'none', borderRadius: '6px', background: '#e0e0e0', color: '#333333', cursor: 'pointer', fontWeight: '600' }}
            >
              ← Back to Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function ParticipantView({ campaignId }) {
  const [campaignData, setCampaignData] = useState(null);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [fontSize, setFontSize] = useState(80);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editCode, setEditCode] = useState('');
  const [savedEditCode, setSavedEditCode] = useState('');
  const [showEditLoader, setShowEditLoader] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhoto, setEditPhoto] = useState(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);
  const [editFontSize, setEditFontSize] = useState(80);

  const THEME_COLOR = '#E2171D';

  useEffect(() => {
    async function loadCampaign() {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('campaign_id', campaignId)
        .single();

      if (error) {
        console.error('Error loading campaign:', error);
        setIsLoadingCampaign(false);
        return;
      }

      setCampaignData(data);
      setFontSize(data.name_box?.fontSize || 80);
      setIsLoadingCampaign(false);
    }

    loadCampaign();
  }, [campaignId]);

  const handlePhotoUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditPhotoUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditPhoto(e.target.result);
        setEditPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCanvas = (currentPhoto, currentName, currentFontSize) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const width = campaignData.dimensions?.width || 800;
      const height = campaignData.dimensions?.height || 400;
      
      canvas.width = width;
      canvas.height = height;

      const bannerImg = new Image();
      bannerImg.src = campaignData.banner_url;
      bannerImg.crossOrigin = 'Anonymous';
      
      bannerImg.onload = () => {
        ctx.drawImage(bannerImg, 0, 0, width, height);

        const photoImg = new Image();
        photoImg.src = currentPhoto;
        photoImg.onload = () => {
          const size = campaignData.photo_circle?.size || 150;
          const x = campaignData.photo_circle?.x || (width - size) / 2;
          const y = campaignData.photo_circle?.y || height * 0.3;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(photoImg, x, y, size, size);
          ctx.restore();

          ctx.beginPath();
          ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          ctx.stroke();

          const nameX = campaignData.name_box?.x || width / 2;
          const nameY = campaignData.name_box?.y || height * 0.75;

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `bold ${currentFontSize}px Arial, sans-serif`;
          
          ctx.shadowColor = 'rgba(255,255,255,0.3)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#1a1a1a';
          ctx.fillText(currentName, nameX, nameY);

          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#1a1a1a';
          ctx.font = `bold ${currentFontSize}px Arial, sans-serif`;
          ctx.fillText(currentName, nameX, nameY);

          resolve(canvas.toDataURL('image/png'));
        };
        photoImg.onerror = reject;
      };
      bannerImg.onerror = reject;
    });
  };

  const generateImage = async () => {
    if (!photo) {
      alert('Please upload your photo first');
      return;
    }
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsGenerating(true);

    try {
      const finalImage = await renderCanvas(photo, name, fontSize);
      
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const response = await fetch(finalImage);
      const blob = await response.blob();
      
      const fileExt = 'png';
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `participants/${campaignId}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('participants')
        .insert([
          {
            edit_code: code,
            campaign_id: campaignId,
            name: name,
            font_size: Math.round(fontSize),
            image_url: publicUrl
          }
        ]);

      if (dbError) throw dbError;

      setGeneratedImage(finalImage);
      setEditCode(code);
    } catch (error) {
      console.error('Generation or saving error:', error);
      alert(`Failed to generate banner: ${error.message || 'Please try again.'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const loadEdit = async () => {
    const trimmedCode = savedEditCode.trim().toUpperCase();
    if (!trimmedCode) {
      alert('Please enter your edit code');
      return;
    }
    
    setShowEditLoader(true);
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('edit_code', trimmedCode)
        .eq('campaign_id', campaignId)
        .single();

      if (error || !data) {
        alert('Edit code not found or belongs to a different campaign');
        return;
      }

      setGeneratedImage(data.image_url);
      setName(data.name);
      setFontSize(data.font_size || 80);
      setEditCode(trimmedCode);
      
      const imgResponse = await fetch(data.image_url);
      const imgBlob = await imgResponse.blob();
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(imgBlob);
      
      alert('Your saved banner has been loaded!');
    } catch (error) {
      console.error('Error loading edit:', error);
      alert(`Error loading edit: ${error.message || 'Please try again.'}`);
    } finally {
      setShowEditLoader(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.download = `my-${campaignData.name}-banner.png`;
    link.href = generatedImage;
    link.click();
  };

  const openEditModal = () => {
    setEditName(name);
    setEditPhoto(null);
    setEditPhotoPreview(null);
    setEditFontSize(fontSize);
    setIsEditing(true);
  };

  const saveEdit = async () => {
    if (!editPhoto && !editName && editFontSize === fontSize) {
      alert('No changes made');
      return;
    }

    setIsGenerating(true);

    try {
      const finalPhoto = editPhoto || photo;
      
      if (!finalPhoto) {
        alert('Please upload a photo');
        setIsGenerating(false);
        return;
      }

      if (!editName.trim()) {
        alert('Please enter your name');
        setIsGenerating(false);
        return;
      }

      const updatedImage = await renderCanvas(finalPhoto, editName, editFontSize);
      
      const response = await fetch(updatedImage);
      const blob = await response.blob();
      
      const fileExt = 'png';
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `participants/${campaignId}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('banners')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('participants')
        .update({
          name: editName,
          font_size: Math.round(editFontSize),
          image_url: publicUrl
        })
        .eq('edit_code', editCode);

      if (dbError) throw dbError;

      setGeneratedImage(updatedImage);
      setName(editName);
      setFontSize(editFontSize);
      if (editPhoto) {
        setPhoto(editPhoto);
      }
      
      setIsEditing(false);
      alert('Your banner has been updated!');
    } catch (error) {
      console.error('Error updating banner:', error);
      alert(`Failed to update banner: ${error.message || 'Please try again.'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoadingCampaign) {
    return null;
  }

  if (!campaignData) {
    return (
      <div className="container" style={containerStyle}>
        <div className="card" style={cardStyle}>
          <h1>Campaign Not Found</h1>
          <p className="subhead">The campaign you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={containerStyle}>
      <div className="card" style={cardStyle}>
        <h1>{campaignData.name}</h1>
        <p className="subhead">Add your photo and name to the banner</p>

        {!generatedImage ? (
          <div style={{ width: '100%' }}>
            <div className="form-group" style={{ width: '100%' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Photo</label>
              <ImageUploader onImageUpload={handlePhotoUpload} />
              {photo && (
                <div style={{ marginTop: '12px', textAlign: 'center', width: '100%' }}>
                  <img src={photo} alt="Your photo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${THEME_COLOR}` }} />
                </div>
              )}
            </div>

            <div className="form-group" style={{ width: '100%' }}>
              <label htmlFor="participantName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Name</label>
              <input
                type="text"
                id="participantName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{ width: '100%', padding: '12px 16px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
                required
              />
            </div>

            <button onClick={generateImage} className="btn btn-primary" disabled={isGenerating} style={{ background: THEME_COLOR, width: '100%', padding: '12px 24px', border: 'none', borderRadius: '6px', color: '#ffffff', fontSize: '16px', cursor: 'pointer', fontWeight: '600' }}>
              {isGenerating ? 'Generating...' : 'Generate My Banner'}
            </button>

            <div style={{ 
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '2px solid #ecf2f9',
              width: '100%'
            }}>
              <p style={{ fontSize: '0.85rem', color: '#4a617a', marginBottom: '8px' }}>
                Have an edit code? Load your saved banner:
              </p>
              <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <input
                  type="text"
                  value={savedEditCode}
                  onChange={(e) => setSavedEditCode(e.target.value.toUpperCase())}
                  placeholder="Enter edit code"
                  style={{
                    flex: '1',
                    padding: '10px 12px',
                    border: '2px solid #dce5ef',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    width: '100%'
                  }}
                />
                <button
                  type="button"
                  onClick={loadEdit}
                  className="btn btn-secondary"
                  style={{ flex: '0 0 auto', padding: '10px 20px', width: 'auto', border: 'none', borderRadius: '6px', background: '#e0e0e0', color: '#333333', cursor: 'pointer', fontWeight: '600' }}
                  disabled={showEditLoader}
                >
                  {showEditLoader ? 'Loading...' : 'Load'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="confirmation" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', color: THEME_COLOR }}>
                <Icons.Check />
              </div>
            </div>
            <h2>Your banner is ready!</h2>
            
            <div style={{ 
              background: '#fff5f5', 
              padding: '12px', 
              borderRadius: '8px',
              marginBottom: '16px',
              border: `2px solid ${THEME_COLOR}`,
              width: '100%'
            }}>
              <p style={{ fontSize: '0.85rem', color: '#4a617a' }}>
                Your unique edit code: <strong style={{ fontSize: '1.2rem', color: THEME_COLOR }}>{editCode}</strong>
              </p>
              <p style={{ fontSize: '0.8rem', color: '#6b7f93', marginTop: '4px' }}>
                Save this code to edit your banner later
              </p>
            </div>
            
            <div style={{ margin: '20px 0', border: '2px solid #eaf0f6', borderRadius: '16px', overflow: 'hidden', width: '100%' }}>
              <img src={generatedImage} alt="Generated banner" style={{ width: '100%', display: 'block' }} />
            </div>

            <div style={{ 
              margin: '16px 0',
              padding: '16px',
              background: '#f8fbfe',
              borderRadius: '12px',
              border: '1px solid #eaf0f6',
              width: '100%'
            }}>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', width: '100%' }}>
                <button
                  type="button"
                  onClick={openEditModal}
                  className="btn btn-primary"
                  style={{ 
                    flex: '1',
                    background: THEME_COLOR,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  <Icons.Edit /> Edit Banner
                </button>
              </div>
            </div>

            {isEditing && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '20px'
              }} onClick={() => setIsEditing(false)}>
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '32px',
                  maxWidth: '800px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  position: 'relative'
                }} onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      color: '#4a617a'
                    }}
                  >
                    <Icons.Close />
                  </button>

                  <h2 style={{ marginBottom: '20px', color: '#0b1f33' }}>Edit Your Banner</h2>

                  <div className="form-group" style={{ width: '100%' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Photo</label>
                    <ImageUploader onImageUpload={handleEditPhotoUpload} />
                    {editPhotoPreview && (
                      <div style={{ marginTop: '12px', textAlign: 'center', width: '100%' }}>
                        <img src={editPhotoPreview} alt="Your photo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${THEME_COLOR}` }} />
                      </div>
                    )}
                    {!editPhotoPreview && photo && (
                      <div style={{ marginTop: '12px', textAlign: 'center', width: '100%' }}>
                        <img src={photo} alt="Current photo" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${THEME_COLOR}` }} />
                        <p style={{ fontSize: '0.8rem', color: '#6b7f93', marginTop: '4px' }}>Current photo (upload new to change)</p>
                      </div>
                    )}
                  </div>

                  <div className="form-group" style={{ width: '100%' }}>
                    <label htmlFor="editName" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Your Name</label>
                    <input
                      type="text"
                      id="editName"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #dce5ef',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div className="form-group" style={{ width: '100%' }}>
                    <label htmlFor="editFontSize" style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Font Size (px)</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                      <input
                        type="number"
                        id="editFontSize"
                        value={Math.round(editFontSize)}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val >= 10 && val <= (campaignData.dimensions?.width * 0.3 || 200)) {
                            setEditFontSize(val);
                          }
                        }}
                        style={{
                          flex: '1',
                          padding: '10px 12px',
                          border: '2px solid #dce5ef',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          width: '100%'
                        }}
                        min="10"
                        max={Math.round(campaignData.dimensions?.width * 0.3 || 200)}
                        step="1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (editFontSize > 10) {
                            setEditFontSize(prev => prev - 5);
                          }
                        }}
                        style={{
                          padding: '10px 16px',
                          background: '#eef3fa',
                          border: '2px solid #dce5ef',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (editFontSize < (campaignData.dimensions?.width * 0.3 || 200)) {
                            setEditFontSize(prev => prev + 5);
                          }
                        }}
                        style={{
                          padding: '10px 16px',
                          background: '#eef3fa',
                          border: '2px solid #dce5ef',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7f93', marginTop: '4px' }}>
                      Min: 10px • Max: {Math.round(campaignData.dimensions?.width * 0.3 || 200)}px
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={saveEdit}
                    className="btn btn-primary"
                    disabled={isGenerating}
                    style={{
                      width: '100%',
                      background: THEME_COLOR,
                      marginTop: '8px',
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#ffffff',
                      fontSize: '16px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    {isGenerating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              <button type="button" onClick={downloadImage} className="btn btn-primary" style={{ flex: '1', minWidth: '150px', background: THEME_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', border: 'none', borderRadius: '6px', color: '#ffffff', cursor: 'pointer', fontWeight: '600' }}>
                <Icons.Download /> Download
              </button>
              <button 
                type="button"
                onClick={() => {
                  setGeneratedImage(null);
                  setPhoto(null);
                  setName('');
                  setEditCode('');
                }} 
                className="btn btn-secondary" 
                style={{ flex: '1', minWidth: '150px', padding: '12px 24px', border: 'none', borderRadius: '6px', background: '#e0e0e0', color: '#333333', cursor: 'pointer', fontWeight: '600' }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Router
export function AppRouter() {
  const [campaignId, setCampaignId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if there's a campaign in URL (for backward compatibility)
      const params = new URLSearchParams(window.location.search);
      const id = params.get('campaign');
      if (id) {
        setCampaignId(id);
        setLoading(false);
        return;
      }

      // Check Supabase Auth session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'the4therfirm@gmail.com';
        if (session.user.email === adminEmail) {
          setIsAdmin(true);
          setLoading(false);
          return;
        }
      }
      
      // Not logged in, redirect to login
      window.location.href = '/login';
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If there's a campaign ID, show participant view (public)
  if (campaignId) {
    return <ParticipantView campaignId={campaignId} />;
  }

  // Otherwise show admin panel (requires login)
  if (!isAdmin) {
    return null;
  }

  return <Home isAdmin={isAdmin} />;
}

export default AppRouter;