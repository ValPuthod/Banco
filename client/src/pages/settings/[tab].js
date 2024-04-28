// ** Demo Components Imports
import AccountSettings from 'src/views/pages/settings/AccountSettings'

const AccountSettingsTab = ({ tab }) => {
    return <AccountSettings tab={tab} />
}

export const getStaticPaths = () => {
    return {
        paths: [
            { params: { tab: 'profile' } },
            { params: { tab: 'security' } },
        ],
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    return {
        props: {
            tab: params?.tab,
        }
    }
}

export default AccountSettingsTab
