from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)
app.jinja_env.globals['zip'] = zip  # expose zip() ke template

# ==========================================
# ROUTES
# ==========================================

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    employee_id = request.form.get('employeeId', '').strip()
    pin = request.form.get('pin', '').strip()
    if employee_id and pin:
        return redirect(url_for('home'))
    return render_template('login.html', error="Mohon isi Employee ID dan PIN Anda.")

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/icon')
def icon():
    search = request.args.get('search', '')
    return render_template('icon.html', search=search)

@app.route('/illustration')
def illustration():
    search = request.args.get('search', '')
    return render_template('illustration.html', search=search)

@app.route('/lottie')
def lottie():
    search = request.args.get('search', '')
    return render_template('lottie.html', search=search)

@app.route('/template')
def template():
    return render_template('template.html')

@app.route('/template/webapps')
def template_webapps():
    return render_template('template_webapps.html')

TEMPLATE_DETAILS = {
    'premium-product-landing-page': {
        'title': 'Premium Product - Landing Page',
        'author': 'davinryan123',
        'image': 'premiumproduct.png',
        'applications': 'Adobe Illustrator, Figma, Sketch',
        'file_types': 'AI, EPS, FIG, SKETCH',
        'additions': 'Layered\nVector',
        'color_space': 'RGB',
        'commercial_license': 'Further Information',
        'description': 'Premium Product - Landing Page',
        'description_body': 'Premium Product flat design concept for landing page. Modern flat vector illustration suitable for web, mobile, hero image, and UI. Easily editable and customize.',
        'features': ['100% vector (Adobe Illustrator Source File)', 'Editable text and color', 'Well organised files', 'Font using Open Sans'],
        'what_you_get': ['AI', 'FPS10', 'SketchApp file', 'Figma'],
        'tags': ['Products', 'Mockups', 'Premium', 'Landing Page', 'Illustration'],
    },
    'high-quality-social-media-instagram-mockup': {
        'title': 'High Quality Social Media Instagram Mockup',
        'author': 'davinryan123',
        'image': 'sosmedmockup.png',
        'applications': 'Adobe Photoshop, Figma',
        'file_types': 'PSD, FIG',
        'additions': 'Layered\nSmart Object',
        'color_space': 'RGB',
        'commercial_license': 'Further Information',
        'description': 'High Quality Social Media Instagram Mockup',
        'description_body': 'High quality social media mockup for Instagram. Perfect for showcasing your designs in a realistic environment. Fully editable and customizable.',
        'features': ['100% vector', 'Editable text and color', 'Well organised files', 'Font using Open Sans'],
        'what_you_get': ['PSD', 'Figma'],
        'tags': ['Social Media', 'Mockups', 'Instagram', 'Illustration'],
    },
    'high-fidelity-wireframe-ui-ux-kit': {
        'title': 'High Fidelity Wireframe UI UX Kit iOS Android App',
        'author': 'davinryan123',
        'image': 'highfidUI.png',
        'applications': 'Figma, Sketch, Adobe XD',
        'file_types': 'FIG, SKETCH, XD',
        'additions': 'Layered\nComponents',
        'color_space': 'RGB',
        'commercial_license': 'Further Information',
        'description': 'High Fidelity Wireframe UI UX Kit iOS Android App',
        'description_body': 'Complete high fidelity wireframe UI/UX kit for iOS and Android applications. Includes hundreds of components and screens ready to use.',
        'features': ['100+ screens', 'Editable components', 'Well organised files', 'Font using Inter'],
        'what_you_get': ['Figma', 'Sketch', 'Adobe XD'],
        'tags': ['UI Kit', 'Wireframe', 'iOS', 'Android', 'Mobile'],
    },
}

TEMPLATE_SLUG_MAP = {
    'premiumproduct.png': 'premium-product-landing-page',
    'sosmedmockup.png': 'high-quality-social-media-instagram-mockup',
    'highfidUI.png': 'high-fidelity-wireframe-ui-ux-kit',
}

@app.route('/template/detail/<slug>')
def template_detail(slug):
    detail = TEMPLATE_DETAILS.get(slug)
    if not detail:
        return redirect(url_for('template_webapps'))
    return render_template('template_detail.html', detail=detail, slug=slug)

@app.route('/logout')
def logout():
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run(debug=True)
