//
//  Login.swift
//  MyHome
//
//  Created by Daniel Peach on 10/6/19.
//  Copyright © 2019 Daniel Peach. All rights reserved.
//

import UIKit
import JGProgressHUD

private let textFieldHeight = 50

class Register: AuthView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .systemGray3
        buildView()
    }
    
    private func buildView() {
        let stack = UIStackView(arrangedSubviews: [emailField, passwordField, passwordConfirmField, registerButton])
        stack.axis = .vertical
        stack.spacing = 15
        stack.distribution = .fillEqually
        
        addSubViews(views: [title, stack, switchToLoginBtn])
        stack.centerView()
        let stackHeight: CGFloat = CGFloat(stack.arrangedSubviews.count * textFieldHeight) + CGFloat(stack.arrangedSubviews.count - 1) * stack.spacing
        stack.setSize(width: 300, height: stackHeight)
        title.centerViewX()
        title.anchor(top: safeTopAnchor, leading: safeLeadingAnchor, bottom: stack.safeTopAnchor, trailing: safeTrailingAnchor, padding: .init(top: 120, left: 0, bottom: 0, right: 0))
        switchToLoginBtn.centerViewX()
        switchToLoginBtn.anchor(top: nil, leading: nil, bottom: safeBottomAnchor, trailing: nil, padding: .init(top: 0, left: 32, bottom: 64, right: 32))
        switchToLoginBtn.setSize(width: 300, height: 30)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // MARK: Components
    let title: UITextView = {
        let text = UITextView()
        text.text = "Register"
        text.font = .boldSystemFont(ofSize: 36)
        text.textAlignment = .center
        text.backgroundColor = .systemGray3
        return text
    }()
    
    let emailField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Email"
        tf.keyboardType = .emailAddress
        tf.borderStyle = .roundedRect
        tf.backgroundColor = .systemBackground
        tf.font = .systemFont(ofSize: 18)
        tf.addTarget(self, action: #selector(checkValidText), for: .editingChanged)
        tf.autocapitalizationType = .none
        return tf
    }()
    
    let passwordField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Password"
        tf.keyboardType = .asciiCapable
        tf.isSecureTextEntry = true
        tf.borderStyle = .roundedRect
        tf.backgroundColor = .systemBackground
        tf.font = .systemFont(ofSize: 18)
        tf.addTarget(self, action: #selector(checkValidText), for: .editingChanged)
        tf.autocorrectionType = .no
        return tf
    }()
    
    let passwordConfirmField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Password"
        tf.keyboardType = .asciiCapable
        tf.isSecureTextEntry = true
        tf.borderStyle = .roundedRect
        tf.backgroundColor = .systemBackground
        tf.font = .systemFont(ofSize: 18)
        tf.addTarget(self, action: #selector(checkValidText), for: .editingChanged)
        tf.autocorrectionType = .no
        return tf
    }()
    
    let registerButton: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.roundedRect)
        btn.backgroundColor = .systemBackground
        btn.isEnabled = false
        btn.setTitle("Register", for: .normal)
        btn.addTarget(self, action: #selector(didClickRegister), for: .touchUpInside)
        btn.clipsToBounds = true
        btn.layer.cornerRadius = 4
        return btn
    }()
    
    let switchToLoginBtn: UIButton = {
        let btn = UIButton(type: UIButton.ButtonType.system)
        btn.setTitle("Have an account? Login instead", for: .normal)
        btn.addTarget(self, action: #selector(didClickSwitchToLogin), for: .touchUpInside)
        return btn
    }()
    
    @objc func didClickRegister() {
        let hud = JGProgressHUD(style: .dark)
        hud.textLabel.text = "Registering..."
        hud.show(in: self)
        hud.backgroundColor = UIColor.systemGray.withAlphaComponent(0.6)
        guard let email = emailField.text else { return }
        guard let password = passwordField.text else { return }
        delegate?.register(email: email, password: password) { res, err in
           if let err = err {
               hud.indicatorView = JGProgressHUDErrorIndicatorView()
               hud.textLabel.text = err.localizedDescription
               hud.tapOnHUDViewBlock = { hud in
                   hud.dismiss(animated: false)
               }
               hud.tapOutsideBlock = { hud in
                   hud.dismiss(animated: false)
               }
               return
           }
           
           hud.indicatorView = JGProgressHUDSuccessIndicatorView()
           hud.textLabel.text = "Registered!"
           hud.dismiss(afterDelay: 1.5, animated: true)
           DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
               let sceneDelegate = self.window?.windowScene?.delegate as! SceneDelegate
               sceneDelegate.coordinator?.authStateChanged()
           }
       }
    }
    
    @objc func didClickSwitchToLogin() {
        delegate?.switchToLogin()
    }
    
    @objc func checkValidText() {
        guard let email = emailField.text else { return }
        guard let password = passwordField.text else { return }
        guard let passwordConfirm = passwordConfirmField.text else { return }
        if email != "" && password != "" && password == passwordConfirm {
            registerButton.isEnabled = true
        } else {
            registerButton.isEnabled = false
        }
    }
}
